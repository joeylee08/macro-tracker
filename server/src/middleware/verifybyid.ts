import { prisma } from '../db/prisma.js'
import type { Request, Response, NextFunction } from 'express'

//Verify ownership of specific resource(s)
type ResourceType = 'user' | 'food' | 'meal' | 'mealEntry'

//Resource type dictionary
const findResource = {
    food: (itemId: number) => prisma.food.findUnique({ where: { id: itemId } }),
    meal: (itemId: number) => prisma.meal.findUnique({ where: { id: itemId } }),
    mealEntry: (itemId: number) => prisma.mealEntry.findUnique({ where: { id: itemId } })
}

const verifyById = (type: ResourceType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId
        const itemId = +req.params.id

        if (type === 'user') {
            if (itemId !== userId) {
                return res.status(403).json({ error: 'FORBIDDEN.' })
            }
            return next()
        }
        const resource = await findResource[type](itemId)
        if (!resource) {
            return res.status(404).json({ 'error': 'Resource not found.'})
        }

        if (userId !== resource.userId) {
            return res.status(403).json({ 'error': 'FORBIDDEN.'})
        }
        next()
    }
}

export { verifyById }