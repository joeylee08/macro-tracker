import { foods, meals } from "../data/dummy";
import FoodCard from "../components/foodcard"

const currentUserId = 1

const Menu = () => {
    const myFoods = foods
                        .filter(item => item.userId === currentUserId)
                        .map(item => <FoodCard key={item.id} food={item}/>)
    return (
        <div id='menuPage'>
            <h1>Your Personalized Menu</h1>
            <p>Here are all of your foods.</p>
            <div className='myFoods'>
                {myFoods}
            </div>
            <div className='createEntry'>
                ENTRY FORM HERE.
            </div>
        </div>
    )
}

export default Menu