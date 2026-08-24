const FoodCard = ({ food }) => {
    return (
        <div className='foodCard'>
            <h3>{food.name}</h3>
            <p>{food.servingSize} {food.servingUnit}</p>
            <p>{food.cal} Calories</p>
            <p>{food.protein}g Protein</p>
            <p>{food.carb}g Carbs</p>
            <p>{food.fat}g Fat</p>
            <p>{food.sodium}mg Sodium</p>
        </div>
    )
}

export default FoodCard