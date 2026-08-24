import { foods } from "../data/dummy";
import PinnedFoods from "../components/pinned"
import MyCollection from "../components/mycollection"
import CreateFoodForm from "../components/createfoodform"
import { useState } from "react";


const currentUserId = 1

const Menu = () => {
    const [myFoods, setMyFoods] = useState(foods.filter(item => item.userId === currentUserId))
    const handleSetMyFoods = (newFood) => {
        setMyFoods([...myFoods, newFood])
    }

    return (
        <div id='menuPage'>
            <h1>Your Personalized Menu</h1>
            <PinnedFoods/>
            <MyCollection myFoods={myFoods} />
            <CreateFoodForm onAddFood={handleSetMyFoods}/>
        </div>
    )
}

export default Menu