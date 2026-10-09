// clock.js

// Calls fn at the top of every minute (:00), not 60s after whenever the page loaded.
// Returns a function that cancels it.
export function scheduleNextMinute(fn) {
  let id
  let cancelled = false

  const arm = () => {
    id = setTimeout(() => {
      fn()
      if (!cancelled) arm()
    }, 60000 - (Date.now() % 60000))
  }

  arm()
  return () => {
    cancelled = true
    clearTimeout(id)
  }
}
