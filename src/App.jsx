import { useState, useEffect } from 'react'
import { verboseDate, verboseTime } from 'verbatempus'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="App">
      <h1>Verbose Time Display</h1>
      <div className="time-container">
        <p className="date">{verboseDate(currentTime)}</p>
        <p className="time">{verboseTime(currentTime)}</p>
      </div>
    </div>
  )
}

export default App