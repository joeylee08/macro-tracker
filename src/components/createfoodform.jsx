import { useState } from 'react'

const CreateFoodForm = ({ onAddFood, currentUserId }) => {
    const [formData, setFormData] = useState({
        id: 'number',
        name: 'string',
        userId: 'number',
        servingSize: 'number',
        servingUnit: 'string',
        cal: 'number',
        protein: 'number',
        carb: 'number',
        fat: 'number',
        sodium: 'number'
    })

    function handleSubmitFood() {

        onAddFood(newFood)
    }
    return (
        <form>
            PENIS.
        </form>
    )
}

export default CreateFoodForm