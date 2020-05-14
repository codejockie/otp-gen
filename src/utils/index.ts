import { pad } from "./pad"

/**
 * Converts given argument to a buffer (bytes).
 * If argument is a number, gets Buffer with size of 8 bytes padded with 0 from left
 * If argument is a string, gets Buffer with full size of the string
 */
export function toBuffer(arg: string | number): Buffer {
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
 * @param {string} hexString Hex string that will be truncated from offset byte to offset + 4 byte
 * @param {number} digits Number of digits to be returned
 * @returns {string} Numerical string in base 10 of the truncated hex string
 */
export function truncate(hexString: string, digits: number): string {
  const offset = parseInt(hexString.charAt(hexString.length - 1), 16)
  // Get the last 31 bits of result
  const result = parseInt(hexString.substr(offset * 2, 2 * 4), 16) & 0x7fffffff

  return pad(String(result), digits, "0")
}

/**
 * Gets the Unix timestamp
 */
export function unix(): number {
  return Math.round(Date.now() / 1000)
}