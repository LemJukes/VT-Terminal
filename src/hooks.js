// hooks.js
import { useState, useEffect } from 'react'
import { scheduleNextMinute } from './clock.js'

// The current time, refreshed on every minute boundary.
export function useNow() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => scheduleNextMinute(() => setNow(new Date())), [])

  return now
}

// `text` revealed one character at a time. Restarts when `text` changes.
// The interval is cleared on unmount and on every restart, so StrictMode's
// double-invoked effect still leaves exactly one typewriter running.
export function useTypewriter(text, speed = 50) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      index++
      setShown(text.substring(0, index))
      if (index >= text.length) clearInterval(interval)
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return shown
}
