const FoodThumb = ({ food, closeThumbnail, item }) => {
    return (
        <div key={food.id} className='foodThumb'>
            <p id='thumbnailText'>{food.name} {+food.servingSize * +item.units} {food.servingUnit}</p>
            <p className='redX thumbX' onClick={() => closeThumbnail(food.id)}>×</p>
        </div>
    )
}

export default FoodThumb