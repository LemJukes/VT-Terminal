// App.jsx
import { useState, useEffect } from 'react'
import { verboseDate, verboseTime } from 'verbatempus'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [displayedText, setDisplayedText] = useState('')

  const typeText = (text, setterFunction, speed = 50) => {
    let index = 0;
    const interval = setInterval(() => {
      setterFunction(text.substring(0, index))
      index++
      if (index > text.length) {
        clearInterval(interval)
      }
    }, speed)
  }

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fullText = '> ' + verboseDate(currentTime) + ' and ' + verboseTime(currentTime)
    typeText(fullText, setDisplayedText)
  }, [currentTime])

  return (
    <div className="App">
      <div className="screen">
        <div className="content">
          <p className="text">{displayedText}</p>
        </div>
      </div>
    </div>
  )
}

export default App