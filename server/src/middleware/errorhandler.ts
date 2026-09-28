import type { Request, Response, NextFunction } from 'express'

// Centralized Error Handler
const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    return res.status(500).json({
        error: 'Internal server error.'
    })
}

export { errorHandler }