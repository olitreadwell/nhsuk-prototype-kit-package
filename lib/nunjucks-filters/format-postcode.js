// This checks the format of the postcode, but not that
// the postcode actually exists.
//
// Both the outward and inward codes are required, so that
// partial postcodes (eg "SW1A") are left untouched rather
// than split at the wrong point.
const postcodeRegex = /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?\d[a-z]{2})$/i

/**
 * Format a postcode with spaces
 *
 * @param {string} [value] - Value to format as postcode
 */
export function formatPostcode(value) {
  let postcode = `${value}`.replaceAll(/\s+/g, '')

  if (!postcodeRegex.test(postcode)) {
    return value
  }

  postcode = postcode.toUpperCase()

  // Split 3 characters from the end
  const splitIndex = postcode.length - 3
  const outcode = postcode.substring(0, splitIndex)
  const incode = postcode.substring(splitIndex)

  // Add spaces to become "E14 4PU"
  return `${outcode} ${incode}`
}
