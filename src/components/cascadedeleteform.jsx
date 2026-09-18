const CascadeDeleteForm = ({ myMeals, myFoods, toggleCascadeDelete}) => {

    


    return (
        <div className='form' id='cascadeDeleteForm'>
            <button type='button' className='closeForm' onClick={() => toggleCascadeDelete('cascadeDelete')}>×</button>
            <div className='cascadeDeleteChild'>
                <h3>Warning!</h3>
                <p>This ingredient is currently used in the following meals:</p>
            </div>
            <div className='cascadeDeleteChild2'>
                
            </div>
            <div className='btnContainer' id='cascadeDeleteBtns'>
                <button className='formBtnCD'>
                    Delete item from all meals.
                </button>
                <button className='formBtnCD'>
                    Delete all affected meals.
                </button>
            </div>
        </div>
        
    )
}

export default CascadeDeleteForm