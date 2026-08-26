import assert from 'node:assert/strict'
import { beforeEach, describe, it, mock } from 'node:test'

import { formatTime } from './format-time.js'

describe('formatTime', () => {
  beforeEach(() => {
    mock.method(console, 'warn', () => {})
  })

  it('formats 24-hour times to a 12-hour clock with am/pm', () => {
    assert.equal(formatTime('14:30'), '2:30pm')
    assert.equal(formatTime('09:05'), '9:05am')
    assert.equal(formatTime('00:30'), '12:30am')
    assert.equal(formatTime('23:59'), '11:59pm')
  })

  it('formats 12-hour times with am/pm', () => {
    assert.equal(formatTime('2:30pm'), '2:30pm')
    assert.equal(formatTime('9:05am'), '9:05am')
    assert.equal(formatTime('12:30pm'), '12:30pm')
    assert.equal(formatTime('12:30am'), '12:30am')
  })

  it("omits minutes for o'clock times", () => {
    assert.equal(formatTime('14:00'), '2pm')
    assert.equal(formatTime('09:00'), '9am')
  })

  it("keeps minutes for o'clock times if omitMinutes is false", () => {
    assert.equal(formatTime('14:00', { omitMinutes: false }), '2:00pm')
    assert.equal(formatTime('09:00', { omitMinutes: false }), '9:00am')
  })

  it('uses midday and midnight for 12:00 and 00:00', () => {
    assert.equal(formatTime('12:00'), 'midday')
    assert.equal(formatTime('00:00'), 'midnight')
  })

  it('uses 12pm and 12am if useWordsForMiddayMidnight is false', () => {
    assert.equal(
      formatTime('12:00', { useWordsForMiddayMidnight: false }),
      '12pm'
    )
    assert.equal(
      formatTime('00:00', { useWordsForMiddayMidnight: false }),
      '12am'
    )
  })

  it('formats hour-only input', () => {
    assert.equal(formatTime('14'), '2pm')
    assert.equal(formatTime('2pm'), '2pm')
  })

  it('displays an error if the time is invalid', () => {
    assert.equal(formatTime(''), 'Invalid time')
    assert.equal(formatTime(false), 'Invalid time')
    assert.equal(formatTime('25:00'), 'Invalid time')
    assert.equal(formatTime('14:60'), 'Invalid time')
    assert.equal(formatTime('13pm'), 'Invalid time')
    assert.equal(formatTime('not a time'), 'Invalid time')
  })
})
