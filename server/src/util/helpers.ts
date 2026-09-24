import { userModel, macroModel, mealModel, foodModel, ingredientModel, mealEntryModel } from './models';

const modelObj = {
    'user': userModel,
    'macro': macroModel,
    'meal': mealModel,
    'food': foodModel,
    'ingredient': ingredientModel,
    'mealEntry': mealEntryModel
}

type ModelType = keyof typeof modelObj;

const validateData = (data: Record <string, unknown> , modelType: ModelType) => {
    if (!(modelType in modelObj)) {
        return false
    }

    const model = modelObj[modelType]

    for (const key in model) {
        if (key === 'ingredients' && modelType === 'meal') {
            if (!Array.isArray(data[key])) return false
            for (const item of data[key]) {
                if (!validateData(item, 'ingredient')) return false
            } 
            continue
        }
        if (data[key] === null || data[key] === undefined) {
            return false
        } else if (typeof data[key] !== model[key as keyof typeof model]) {
            return false
        }
    }
    return true
}

export { validateData };