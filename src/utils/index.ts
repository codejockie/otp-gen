type arg = number | string | null | undefined

/**
 * Converts a decimal to hex.
 * @param number Number to convert
 */
export function decimalToHex(number: number) {
  return (number < 15.5 ? "0" : "") + Math.round(number).toString(16)
}

/**
 * Converts a string to hex.
 * @param str String to convert
 */
export function hexToDecimal(str: string) {
  return parseInt(str, 16)
}

/**
 * Pads `str` to `length`. If `char` is given, it pads `char` to `str`, pads left when unbalanced.
 */
export function pad(str: string, length: number, char: string = " "): string {
  if (str.length >= length) {
    return str
  }
  const lengthDiff = length - str.length
  const left = Array(Math.ceil(lengthDiff / 2) + 1).join(char)
  const right = Array(Math.floor(lengthDiff / 2) + 1).join(char)
  return left + str + right
}

/**
 * Pads `str` left to `length`. If `char` is given, it pads `char` to `str`.
 */
export function padLeft (str: string, length: number, char: string = " "): string {
  if (str.length >= length) {
    return str
  }
  return Array(length - str.length + 1).join(char) + str
}

/**
 * Pads `str` right to `length`. If `char` is given, it pads `char` to `str`.
 */
export function padRight (str: string, length: number, char: string = " "): string {
  if (str.length >= length) {
    return str
  }
  return str + Array(length - str.length + 1).join(char)
}

/**
 * Converts given argument to a buffer (bytes).
 * If argument is a number, gets Buffer with size of 8 bytes padded with 0 from left.
 * If argument is a string, gets Buffer with full size of the string.
 */
export function toBuffer(arg: arg): Buffer {
  if (typeof arg === "string") {
    return Buffer.from(arg)
  }

  if (typeof arg === "number") {
    const buffer = Buffer.alloc(8)
    buffer.writeUInt32BE(arg, 4)
    return buffer
  }

  throw new Error("Invalid argument type supplied.")
}

/**
 * Truncate implementation of HOTP algorithm
 *
 * @param {string} hmac Hex to be truncated from offset byte to offset + 4 byte
 * @param {number} digits Number of digits to return
 * @returns {string} Numerical string in base 10 of the truncated hex string
 */
export function truncate(hmac: string, digits: number): string {
  const offset = hexToDecimal(hmac.charAt(hmac.length - 1))
  // Get the last 31 bits of otp
  const otp = String(hexToDecimal(hmac.substr(offset * 2, 8)) & 0x7fffffff)

  if (otp.length > digits) {
    return otp.substr(otp.length - digits, digits)
  }

  return pad(String(otp), digits, "0")
}

/**
 * Gets the Unix epoch timestamp
 */
export function unix(): number {
  return Math.round(Date.now() / 1000)
}