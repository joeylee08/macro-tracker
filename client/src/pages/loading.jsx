import buddy from '../assets/buddy.jpg'

const Loading = () => {

  return (
    <div className='mainPage'>
      <div className='errorBox'>
        <h1>Waking up the server...</h1>
        <img className='buddyPhoto' src={buddy} alt='buddy'></img>
				<p>This might take a moment.</p>
      </div>
    </div>
  )
}

export default Loading