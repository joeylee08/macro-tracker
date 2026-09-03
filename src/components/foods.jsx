import FoodCard from "./foodcard"

const Foods = ({ myFoods, handleIsEditing }) => {
    const renderedFoods = myFoods
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(item => <FoodCard key={item.id} food={item} handleIsEditing={handleIsEditing}/>)
    
    return (
        <div className='myFoods'>
            <div className='myFoodsChild'>
                {renderedFoods}
            </div>
        </div>
    )
}

export default Foods