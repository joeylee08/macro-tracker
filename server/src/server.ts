import express from "express"
import cors from "cors"

const app = express()
const PORT = 5000

// Middleware. Allows the React client's origin to access this server.
app.use(cors({
    origin: "http://localhost:5173"
}))

// Middleware. Parses incoming JSON requests into Javascript objects.
app.use(express.json())

app.get("/", (request, response) => {
    response.send("Macro Tracker API is alive!")
})

const meals = [
    {id: 1, name: 'Prison Oatmeal', userId: 1, ingredients: [{foodId: 4, units: 1}, {foodId: 5, units: 2}, {foodId: 6, units: 1}]},
    {id: 2, name: 'Tacos Ch Avo', userId: 1, ingredients: [{foodId: 1, units: 5.92}, {foodId: 8, units: 0.125}, {foodId: 2, units: 3}, {foodId: 14, units: 1}, {foodId: 11, units: 2}, {foodId: 13, units: 1}]},
    {id: 3, name: 'Tacos Egg Avo GT', userId: 1, ingredients: [{foodId: 3, units: 2}, {foodId: 17, units: 1.33}, {foodId: 8, units: 0.125}, {foodId: 2, units: 3}, {foodId: 14, units: 1}, {foodId: 13, units: 1}]},
    {id: 4, name: 'Orange Ch Bowl', userId: 1, ingredients: [{foodId: 1, units: 5.92}, {foodId: 9, units: 1}, {foodId: 12, units: 1}, {foodId: 13, units: 1}, {foodId: 14, units: 1}, {foodId: 15, units: 1}]},
    {id: 5, name: 'Prison Tostadas Ch', userId: 1, ingredients: [{foodId: 1, units: 5.92}, {foodId: 2, units: 3}, {foodId: 8, units: 0.125}, {foodId: 11, units: 2}, {foodId: 13, units: 1}, {foodId: 14, units: 1}]},
    {id: 6, name: 'Orange Pk Bowl', userId: 1, ingredients: [{foodId: 16, units: 6.34}, {foodId: 9, units: 1}, {foodId: 12, units: 1}, {foodId: 13, units: 1}, {foodId: 14, units: 1}, {foodId: 15, units: 1}]},
    {id: 7, name: 'Prison Tostadas Pk', userId: 1, ingredients: [{foodId: 16, units: 6.34}, {foodId: 2, units: 3}, {foodId: 8, units: 0.125}, {foodId: 11, units: 2}, {foodId: 13, units: 1}, {foodId: 14, units: 1}]},
    {id: 8, name: 'Sausage Rice Bowl', userId: 1, ingredients: [{foodId: 18, units: 3}, {foodId: 9, units: 1}, {foodId: 12, units: 1}, {foodId: 19, units: 1}]},
    {id: 10, name: 'Pita Ch Pizza', userId: 1, ingredients: [{foodId: 23, units: 1}]},
]
const mealIds = [1, 2, 3, 4, 5]

//Request parameters. :param is sent dynamically from the client.
//Its value is stored in the request.params object.
app.get('/api/meals/:id', (req, res) => {
    const id = +req.params.id
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested mealID must be a number.'
        })
    }
    const meal = meals.find(meal => meal.id === id)
    if (meal === undefined) {
        return res.status(404).json({
            'error': 'Meal not found.'
        })
    }
    res.json(meal)
})

app.post('/api/test', (request, response) => {
    const data = request.body
    // You can chain .status(code) to .json(responseData)
    response.status(201).json({
        message: "Object successfully created.",
        data: data
    })
})

app.patch('/api/meals/:id', (req, res) => {
    const id = +req.params.id
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested mealID must be a number.'
        })
    }
    const meal = meals.find(meal => meal.id === id)
    if (meal === undefined) {
        return res.status(404).json({
            'error': 'Meal not found.'
        })
    }
    const objData = req.body
    Object.assign(meal, objData)
    res.json(meal)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})