// App.jsx
import { format } from 'verbatempus'
import { useNow, useTypewriter } from './hooks.js'
import { levelFromSearch } from './level.js'
import './App.css'

function App() {
  const level = levelFromSearch(window.location.search)
  const now = useNow()
  const displayedText = useTypewriter('> ' + format(now, { level, parts: 'both' }))

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
