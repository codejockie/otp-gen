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
