const FoodCard = ({ food, handleIsEditing, handleDelete }) => {

    const handleDeleteFood = (event) => {
        event.stopPropagation()
        handleDelete('food', food.id)
    }

    return (
        <div className='foodCard' onClick={() => handleIsEditing('food', true, food.id)}>
            <button type='button' className='deleteBtn' onClick={handleDeleteFood}>×</button>
            <h3>{food.name}</h3>
            <p></p>
            <p>{food.cal} Calories / {food.servingSize} {food.servingUnit}</p>
            <p>{food.protein}g Protein</p>
            <p>{food.carb}g Carbs</p>
            <p>{food.fat}g Fat</p>
            <p>{food.sodium}mg Sodium</p>
        </div>
    )
}

export default FoodCard