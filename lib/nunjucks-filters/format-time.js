const timeRegex = /^(\d{1,2})(?::(\d{2}))?(?::(\d{2}))?\s*(am|pm)?$/i

/**
 * Format a time whilst following the NHS.UK style guide for time
 *
 * The input can be a 24-hour time string like `14:30`, a 12-hour time string
 * like `2:30pm`, or an hour-only string like `14`.
 *
 * The filter converts the time to a 12-hour clock, adds `am` or `pm` as
 * required, and uses a colon to separate hours and minutes. Minutes are
 * omitted for "o'clock" times (for example `5pm`), and `midday` and
 * `midnight` are used instead of `12pm` and `12am`.
 *
 * @example
 * ```njk
 * {{ data.appointmentTime | formatTime }}
 * ```
 * @example
 * ```njk
 * {{ data.appointmentTime | formatTime({ omitMinutes: false }) }}
 * ```
 * @see {@link https://service-manual.nhs.uk/content/numbers-measurements-dates-time#time}
 * @param {string|unknown} input - Time as a 24-hour or 12-hour string
 * @param {object} [options] - Options
 * @param {boolean} [options.omitMinutes] - Omit minutes for "o'clock" times
 * @param {boolean} [options.useWordsForMiddayMidnight] - Use "midday" and "midnight"
 * @returns {string} `string` as a human readable time
 */
export function formatTime(input, options) {
  const resolvedOptions = {
    omitMinutes: true,
    useWordsForMiddayMidnight: true,
    ...options
  }

  if (typeof input !== 'string') {
    console.warn('Invalid time:', input)
    return 'Invalid time'
  }

  const match = input.trim().match(timeRegex)

  if (!match) {
    console.warn('Invalid time:', input)
    return 'Invalid time'
  }

  let [, hourStr, minuteStr, secondStr, period] = match
  let hour = parseInt(hourStr, 10)
  const minute = minuteStr ? parseInt(minuteStr, 10) : 0
  const second = secondStr ? parseInt(secondStr, 10) : 0

  if (hour > 23 || minute > 59 || second > 59) {
    console.warn('Invalid time:', input)
    return 'Invalid time'
  }

  if (period) {
    if (hour < 1 || hour > 12) {
      console.warn('Invalid time:', input)
      return 'Invalid time'
    }
    if (period.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12
    } else if (period.toLowerCase() === 'am' && hour === 12) {
      hour = 0
    }
  }

  if (resolvedOptions.useWordsForMiddayMidnight) {
    if (hour === 0 && minute === 0 && second === 0) {
      return 'midnight'
    }
    if (hour === 12 && minute === 0 && second === 0) {
      return 'midday'
    }
  }

  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  const periodLabel = hour < 12 ? 'am' : 'pm'

  let formatted = `${displayHour}`

  if (!resolvedOptions.omitMinutes || minute !== 0) {
    formatted += `:${String(minute).padStart(2, '0')}`
  }

  formatted += periodLabel

  return formatted
}
