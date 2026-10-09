import { StrictMode } from 'react'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act, cleanup } from '@testing-library/react'
import App from './App.jsx'

const VERBOSE_1024 =
  '> it is tuesday march the third twenty twenty six, and it is twenty four minutes past ten oclock in the morning'
const VERBOSE_1025 =
  '> it is tuesday march the third twenty twenty six, and it is twenty five minutes past ten oclock in the morning'
const TYPING_TIME = 50 * 120 // 50ms a character; every phrase here is under 120 characters

const screenText = (container) => container.querySelector('.text').textContent
const advance = (ms) => act(() => { vi.advanceTimersByTime(ms) })

function renderApp(search = '') {
  window.history.replaceState(null, '', '/' + search)
  return render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 3, 10, 24, 10)) // Tuesday 10:24:10
  })
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('types out the verbose date and time as one sentence', () => {
    const { container } = renderApp()
    expect(screenText(container)).toBe('')

    advance(150)
    expect(screenText(container)).toBe('> i')

    advance(TYPING_TIME)
    expect(screenText(container)).toBe(VERBOSE_1024)
  })

  test('says "it is" once before the date and once after the joiner, never doubled', () => {
    const { container } = renderApp()
    advance(TYPING_TIME)
    expect(screenText(container).match(/it is/g)).toHaveLength(2)
    expect(screenText(container)).not.toMatch(/it is it is/)
  })

  test('StrictMode leaves one typewriter and one minute timer, not two typewriters', () => {
    renderApp()
    expect(vi.getTimerCount()).toBe(2)
  })

  test('once typing finishes only the minute timer remains', () => {
    renderApp()
    advance(TYPING_TIME)
    expect(vi.getTimerCount()).toBe(1)
  })

  test('unmounting clears every timer', () => {
    const { unmount } = renderApp()
    advance(500)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  test('updates on the minute boundary, not 60s after load', () => {
    const { container } = renderApp()
    advance(TYPING_TIME)
    expect(screenText(container)).toBe(VERBOSE_1024)

    advance(49_999 - TYPING_TIME) // 10:24:59.999
    expect(screenText(container)).toBe(VERBOSE_1024)

    advance(1) // 10:25:00.000: retyping begins
    advance(TYPING_TIME)
    expect(screenText(container)).toBe(VERBOSE_1025)
  })

  test('a new minute restarts the typewriter cleanly, with no stray timers', () => {
    renderApp()
    advance(50_000 + 500) // into the retype of 10:25
    expect(vi.getTimerCount()).toBe(2)
    advance(TYPING_TIME)
    expect(vi.getTimerCount()).toBe(1)
  })

  describe('?level=', () => {
    test.each([
      ['verbose', VERBOSE_1024],
      ['lengthy', '> it is tuesday march third at twenty four past ten in the morning'],
      ['short', '> it is tuesday the third at almost half past ten am'],
      ['terse', '> it is tuesday at quarter after ten'],
    ])('%s', (level, expected) => {
      const { container } = renderApp(`?level=${level}`)
      advance(TYPING_TIME)
      expect(screenText(container)).toBe(expected)
    })
  })
})
