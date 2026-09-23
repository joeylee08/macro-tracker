import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
//   const food = await prisma.food.create({
//     data: {
//         name: 'Mama Salsa',
//         userId: 1,
//         servingSize: 1,
//         servingUnit: 'tbsp',
//         cal: 5,
//         protein: 0,
//         carb: 1,
//         fat: 0,
//         sodium: 80
//     }
//   });

//   console.dir(food, { depth : null });

    // const meal = await prisma.meal.create({
    //     data: {
    //         name: "Chicken Tacos",
    //         userId: 1,
    //         mealIngredients: {
    //             create: [
    //                 { foodId: 1, units: 4},
    //                 { foodId: 2, units: 4},
    //                 { foodId: 3, units: 1},
    //                 { foodId: 4, units: 1},
    //                 { foodId: 5, units: 0.125},
    //                 { foodId: 6, units: 1}
    //             ]
    //         }
    //     },
    //     include: {
    //         mealIngredients: true
    //     }
    // })
    // const meal = await prisma.meal.findUnique({
    //     where: {
    //         id: 1,
    //     },

    //     include: {
    //         mealIngredients: {
    //             include: {
    //                 food: true
    //             }
    //         }
    //     }
    // })
    // console.dir(meal, { depth: null })
}

main();