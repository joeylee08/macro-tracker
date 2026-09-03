const FoodCard = ({ food, handleIsEditing }) => {
    return (
        <div className='foodCard' onClick={() => handleIsEditing('food', true, food.id)}>
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