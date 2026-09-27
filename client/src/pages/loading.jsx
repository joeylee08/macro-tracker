import buddy from '../assets/buddy.jpg'

const Loading = () => {

  return (
    <div className='mainPage'>
      <div className='errorBox'>
        <h1>Loading Macro Tracker...</h1>
        <img className='buddyPhoto' src={buddy} alt='buddy'></img>
      </div>
    </div>
  )
}

export default Loading