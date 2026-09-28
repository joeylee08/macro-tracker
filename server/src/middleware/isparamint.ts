import type { Request, Response, NextFunction } from 'express'

const isParamInt = (req: Request, res: Response, next: NextFunction) => {
    const param = req.params.id || req.params.userId || req.params.foodId
    const paramId = +param
    if (Number.isNaN(paramId) || !Number.isInteger(paramId) || paramId <= 0) {
        return res.status(400).json({
            'error': 'Route parameter needs to be a positive integer.'
        })
    }
    next()
}
export { isParamInt }