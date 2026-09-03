const FoodCard = ({ food, handleIsEditing, handleDelete }) => {
    return (
        <div className='foodCard' onClick={() => handleIsEditing('food', true, food.id)}>
            <button type='button' className='deleteBtn' onClick={(event) => handleDelete(event, 'food', food.id)}>x</button>
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