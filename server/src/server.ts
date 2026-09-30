import express from 'express'
import cors from "cors"
import "dotenv/config";
import session from 'express-session'
import pgSession from 'connect-pg-simple'
import { errorHandler } from './middleware/errorhandler.js';
import { router as authRouter } from './routes/auth.js';
import { router as usersRouter } from './routes/users.js';
import { router as foodsRouter } from './routes/foods.js';
import { router as mealsRouter } from './routes/meals.js';
import { router as mealEntriesRouter } from './routes/mealentries.js';
import { router as userResourceRouter } from './routes/userresources.js';


const app = express()
const PORT = process.env.PORT || 5000

const PostgresStore = pgSession(session)

// Middleware. Allows the React client's origin to access this server.
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

// Middleware. Parses incoming JSON requests into JS objects.
app.use(express.json())

app.use(session({
    store: new PostgresStore({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true
    }),
    name: 'macroTracker.sid',
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}))

// API Routes
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/users/:userId', userResourceRouter)
app.use('/api/foods', foodsRouter)
app.use('/api/meals', mealsRouter)
app.use('/api/mealEntries', mealEntriesRouter)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})