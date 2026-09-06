const FoodThumb = ({ food, closeThumbnail, item }) => {
    return (
        <div key={food.id} className='foodThumb'>
            <p id='thumbnailText'>{food.name} {+food.servingSize * +item.units} {food.servingUnit}</p>
            <p id='removeX' onClick={() => closeThumbnail(food.id)}>×</p>
        </div>
    )
}

export default FoodThumb