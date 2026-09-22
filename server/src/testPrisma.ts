import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const meals = await prisma.meal.findMany({
    include: {
        mealIngredients: {
            include: { food: true }
        }
    }
  });

  console.dir(meals, { depth : null });
}

main();