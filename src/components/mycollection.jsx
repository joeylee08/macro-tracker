import FoodCard from "./foodcard"

const MyCollection = ({ myFoods }) => {
    const renderedFoods = myFoods
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(item => <FoodCard key={item.id} food={item}/>)
    
    return (
        <div className='myFoods'>
            <div className='myFoodsChild'>
                {renderedFoods}
            </div>
        </div>
    )
}

export default MyCollection