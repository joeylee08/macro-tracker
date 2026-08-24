import FoodCard from "./foodcard"

const MyCollection = ({ myFoods }) => {
    const renderedFoods = myFoods
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(item => <FoodCard key={item.id} food={item}/>)
    
    return (
        <div className='myFoods'>
                {renderedFoods}
        </div>
    )
}

export default MyCollection