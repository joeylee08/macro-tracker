import { foods, meals } from "../data/dummy";
import Meals from "../components/meals"
import Foods from "../components/foods"
import { useState } from "react";

const Today = () => {
    return (
        <div className='mainPage'>
            <div className='headerBox'>
                <h1>Your Daily Totals</h1>
            </div>
        </div>
    )
}

export default Today