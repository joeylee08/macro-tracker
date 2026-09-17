import FoodCard from "./foodcard"

const Foods = ({ myFoods, handleIsEditing, handleDelete }) => {
    const renderedFoods = myFoods
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(item => <FoodCard key={item.id} food={item} handleIsEditing={handleIsEditing} handleDelete={handleDelete}/>)
    
    return (
        <div className='myFoods'>
            <div className='myFoodsChild'>
                {renderedFoods.length === 0 ? <h1 className='dashboardPlaceholder'>Add a new ingredient.</h1> : renderedFoods}
            </div>
        </div>
    )
}

export default Foods