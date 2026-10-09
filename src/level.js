// level.js
const LEVELS = ['verbose', 'lengthy', 'short', 'terse']

// ?level=short -> 'short'. Anything missing or unrecognised falls back to 'verbose'.
export function levelFromSearch(search) {
  const level = new URLSearchParams(search).get('level')?.toLowerCase()
  return LEVELS.includes(level) ? level : 'verbose'
}
