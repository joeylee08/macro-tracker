import express from "express"
import cors from "cors"
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
// import { validateData } from 

const app = express()
const PORT = 5000

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// Middleware. Allows the React client's origin to access this server.
app.use(cors({
    origin: "http://localhost:5173"
}))

// Middleware. Parses incoming JSON requests into Javascript objects.
app.use(express.json())

app.get("/", (request, response) => {
    response.send("Macro Tracker API is alive!")
})

//Request parameters. :param is sent dynamically from the client.
//Its value is stored in the request.params object.

app.get('/api/meals/:id', async (req, res) => {
    const id = +req.params.id
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested mealID must be a number.'
        })
    }
    const meal = await prisma.meal.findUnique({
        where: {
            id: id,
        },
        include: {
            mealIngredients: {
                include: {
                    food: true
                }
            }
        }
    })
    if (!meal) {
        return res.status(404).json({
            'error': 'Meal not found.'
        })
    }
    res.json(meal)
})

app.post('/api/meals', (req, res) => {
    const meal = req.body
    const name = meal.name
    if (typeof name !== 'string' || name.trim() === '') {
        res.status(400).json({
            'error': 'Name must be a string with at least one character.'
        })
        return
    }
    const userId = meal.userId //or if the userId doesn't exist in the database
    if (Number.isNaN(userId)) {
        res.status(400).json({
            'error': 'User ID must be a number.'
        })
        return
    }
    const mealIngredients = meal.ingredients
    if (!Array.isArray(mealIngredients) || mealIngredients.length === 0) {
        res.status(400).json({
            'error': 'Ingredients must be an array containing at least one item.'
        })
        return
    }

    const newMeal = {
        name: meal.name,
        userId: meal.userId,
        mealIngredients: {
            
        }
    }

    res.status(201).json(newMeal)
})

app.patch('/api/meals/:id', (req, res) => {
    const id = +req.params.id
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested mealID must be a number.'
        })
    }

    // if (!meal) {
    //     return res.status(404).json({
    //         'error': 'Meal not found.'
    //     })
    // }
    const { name } = req.body
    if (typeof name !== 'string') {
        return res.status(400).json({
            'error': 'Meal name must be a string.'
        })
    }
    const trimmed = name.trim()
    if (trimmed.length === 0) {
        return res.status(400).json({
            'error': 'Name cannot be an empty string.'
        })
    }
    if (trimmed.length > 100) {
        return res.status(400).json({
            'error': 'Names cannot be longer than 100 characters.'
        })
    }
   
    res.json()
})

app.delete('/api/meals/:id', (req, res) => {
    const id = +req.params.id
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Meal ID must be a number.'
        })
    }

    // if (!meal) {
    //     return res.status(404).json({
    //         'error': 'Meal not found.'
    //     })
    // }

    res.json({
        'message': 'Successfully deleted meal.',
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


/*

CREATE TABLE meals (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id)
);

INSERT INTO meals (name, user_id)
VALUES ('Tacos Egg Avo GT', 1);

CREATE TABLE foods (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO foods (name) VALUES ('Salsa');
INSERT INTO foods (name) VALUES ('Ground Turkey');
INSERT INTO foods (name) VALUES ('Avocado');

CREATE TABLE meal_ingredients (
    meal_id INTEGER NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
    food_id INTEGER NOT NULL REFERENCES foods(id) ON DELETE CASCADE,
    units DOUBLE PRECISION NOT NULL CHECK (units > 0),
    PRIMARY KEY (meal_id, food_id)    <= Table-level constraint
);

ON DELETE CASCADE => "If a meal is deleted, automatically delete any
related rows on the JOIN table meal_ingredients"

SELECT meals.name AS meal_name, foods.name AS food_name, meal_ingredients.units
FROM meal_ingredients
JOIN meals ON meals.id = meal_ingredients.meal_id
JOIN foods ON foods.id = meal_ingredients.food_id
WHERE meals.id = 1;

INSERT INTO ...             POST
SELECT ...                  GET
UPDATE ... WHERE ...        PATCH
DELETE FROM ... WHERE ...   DELETE
JOIN                        combine related resources

*/