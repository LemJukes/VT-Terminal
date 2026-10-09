import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { scheduleNextMinute } from './clock.js'

describe('scheduleNextMinute', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 3, 12, 0, 25, 300)) // 12:00:25.300
  })
  afterEach(() => vi.useRealTimers())

  test('fires at the next :00, not 60s after it was scheduled', () => {
    const fn = vi.fn()
    scheduleNextMinute(fn)

    vi.advanceTimersByTime(34_699)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1) // 12:01:00.000
    expect(fn).toHaveBeenCalledTimes(1)
    expect(new Date().getSeconds()).toBe(0)
  })

  test('keeps firing on every minute boundary', () => {
    const fn = vi.fn()
    scheduleNextMinute(fn)

    vi.advanceTimersByTime(34_700 + 60_000 * 3)
    expect(fn).toHaveBeenCalledTimes(4)
  })

  test('cancel stops it', () => {
    const fn = vi.fn()
    const cancel = scheduleNextMinute(fn)
    cancel()

    vi.advanceTimersByTime(180_000)
    expect(fn).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })

  test('cancelling from inside the callback does not re-arm', () => {
    let cancel
    const fn = vi.fn(() => cancel())
    cancel = scheduleNextMinute(fn)

    vi.advanceTimersByTime(180_000)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)
  })
})
