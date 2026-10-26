
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
	PrismaClient,
	type Prisma,
} from "../generated/prisma/client.js";

const demoUsername = process.env.DEMO_USERNAME;
const databaseUrl = process.env.DATABASE_URL;
const apply = process.argv.includes("--apply");

const DAYS = 21;

if (!demoUsername || !databaseUrl) {
	throw new Error("DEMO_USERNAME and DATABASE_URL are required.");
}

if (demoUsername !== "demoacc") {
	throw new Error("Safety check: DEMO_USERNAME must be 'demo'.");
}

const adapter = new PrismaPg({
	connectionString: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

function getDateKey(date: Date): string {
	return date.toISOString().slice(0, 10);
}

async function main() {
	const databaseInfo = await prisma.$queryRaw<
		{ database: string; schema: string }[]
	>`
		SELECT
			current_database() AS database,
			current_schema() AS schema
	`;

	console.table(databaseInfo);

	const user = await prisma.user.findUnique({
		where: { username: demoUsername },
	});

	if (!user) {
		throw new Error("Demo account not found.");
	}

	const existingEntries = await prisma.mealEntry.findMany({
		where: { userId: user.id },
		select: { dateAndTime: true },
	});

	const existingDates = new Set(
		existingEntries.map((entry) =>
			getDateKey(entry.dateAndTime)
		)
	);

	const meals = await prisma.meal.findMany({
		where: { userId: user.id },
		include: {
			mealIngredients: {
				include: { food: true },
			},
		},
		orderBy: { id: "asc" },
	});

	const mealTemplates = meals
		.filter((meal) => meal.mealIngredients.length > 0)
		.map((meal) => {
			const totals = {
				cal: 0,
				protein: 0,
				carb: 0,
				fat: 0,
				sodium: 0,
			};

			for (const ingredient of meal.mealIngredients) {
				const { food, units } = ingredient;

				totals.cal += food.cal * units;
				totals.protein += food.protein * units;
				totals.carb += food.carb * units;
				totals.fat += food.fat * units;
				totals.sodium += food.sodium * units;
			}

			return {
				name: meal.name,
				...totals,
			};
		});

	if (mealTemplates.length === 0) {
		throw new Error(
			"No saved meals with ingredients found for demo."
		);
	}

	const entries: Prisma.MealEntryCreateManyInput[] = [];

	const today = new Date();

	for (let daysAgo = DAYS - 1; daysAgo >= 0; daysAgo--) {
		const date = new Date(
			Date.UTC(
				today.getUTCFullYear(),
				today.getUTCMonth(),
				today.getUTCDate() - daysAgo,
				12
			)
		);

		const dateKey = getDateKey(date);

		if (existingDates.has(dateKey)) {
			continue;
		}

		const mealCount = Math.floor(Math.random() * 4) + 3;

		for (let i = 0; i < mealCount; i++) {
			const index =
				(daysAgo * 3 + i * 7) % mealTemplates.length;

			const meal = mealTemplates[index];

			const entryDate = new Date(date);

			entryDate.setUTCHours(
				8 + i * 2,
				0,
				0,
				0
			);

			entries.push({
				userId: user.id,
				name: meal.name,
				cal: meal.cal,
				protein: meal.protein,
				carb: meal.carb,
				fat: meal.fat,
				sodium: meal.sodium,
				dateAndTime: entryDate,
			});
		}
	}

	console.log("\nDEMO HISTORY PREVIEW");
	console.log("--------------------");
	console.log("Username:", user.username);
	console.log("User ID:", user.id);
	console.log("Saved meals:", mealTemplates.length);
	console.log("Existing history entries:", existingEntries.length);
	console.log("New history entries:", entries.length);
	console.log("Mode:", apply ? "APPLY" : "DRY RUN");

	console.table(
		entries.slice(0, 10).map((entry) => ({
			date: new Date(entry.dateAndTime as Date).toISOString().slice(0, 10),
			meal: entry.name,
			cal: Math.round(entry.cal),
			protein: Math.round(entry.protein),
			carb: Math.round(entry.carb),
			fat: Math.round(entry.fat),
			sodium: Math.round(entry.sodium),
		}))
	);

	if (!apply) {
		console.log("\nDRY RUN COMPLETE.");
		console.log("No database changes were made.");
		return;
	}

	if (entries.length === 0) {
		console.log("No new entries needed.");
		return;
	}

	const targetDates = [
		...new Set(
			entries.map((entry) =>
				getDateKey(entry.dateAndTime as Date)
			)
		),
	];

	await prisma.$transaction(async (tx) => {
		const currentEntries = await tx.mealEntry.findMany({
			where: {
				userId: user.id,
			},
			select: {
				dateAndTime: true,
			},
		});

		const currentDates = new Set(
			currentEntries.map((entry) =>
				getDateKey(entry.dateAndTime)
			)
		);

		const conflicts = targetDates.filter((date) =>
			currentDates.has(date)
		);

		if (conflicts.length > 0) {
			throw new Error(
				`History changed since preview. Conflicting dates: ${conflicts.join(", ")}`
			);
		}

		await tx.mealEntry.createMany({
			data: entries,
		});
	});

	console.log(
		`\nSUCCESS: Created ${entries.length} demo history entries.`
	);
}

try {
	await main();
} finally {
	await prisma.$disconnect();
}
