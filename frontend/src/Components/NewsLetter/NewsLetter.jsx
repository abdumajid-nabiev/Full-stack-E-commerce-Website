import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Email orqali super tanlovlardan xabardor bo'lasiz</h1>
      <p>Yangiliklarga a'zo bo'ling !</p>
      <div>
        <input type="email" placeholder='Your email id' />
        <button>A'zo bo'lish</button>
      </div>
    </div>
  )
}

export default NewsLetter
