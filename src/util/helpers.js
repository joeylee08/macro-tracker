import { userModel, mealModel, foodModel, ingredientModel, mealEntryModel } from '../models/models.js';

const modelObj = {
    'user': userModel,
    'meal': mealModel,
    'food': foodModel,
    'ingredient': ingredientModel,
    'mealEntry': mealEntryModel
}

function validateData(data, modelType) {
    if (!(modelType in modelObj)) {
        alert('Not a valid model type.')
        return false
    }

    const model = modelObj[modelType]

    for (const key in model) {
        if (key === 'ingredients') continue

        if (data[key] === null || data[key] === undefined) {
            alert('Please fill out all fields.');
            return false
        } else if (typeof data[key] !== model[key]) {
            alert(`Incorrect data type. ${key} needs to be a ${model[key]}.`)
            return false
        }
    }
    return true
}

//when creating a new entry for globalFood or food, the user will have the 
//option of simply not entering macros they don't want to log

//if they keep all the macros but don't enter anything, it will be initialized to 0

//the empty ingredients array will be there independently of user interaction
//ingredient structure will be validated as they are added

export { validateData };