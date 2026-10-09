import { describe, test, expect } from 'vitest'
import { levelFromSearch } from './level.js'

describe('levelFromSearch', () => {
  test.each(['verbose', 'lengthy', 'short', 'terse'])('?level=%s', (level) => {
    expect(levelFromSearch(`?level=${level}`)).toBe(level)
  })

  test('defaults to verbose when absent', () => {
    expect(levelFromSearch('')).toBe('verbose')
    expect(levelFromSearch('?other=1')).toBe('verbose')
  })

  test('falls back to verbose for unknown values', () => {
    expect(levelFromSearch('?level=brief')).toBe('verbose')
    expect(levelFromSearch('?level=')).toBe('verbose')
  })

  test('is case-insensitive', () => {
    expect(levelFromSearch('?level=SHORT')).toBe('short')
  })
})
