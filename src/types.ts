export enum HashAlgo {
  SHA1 = "sha1",
  SHA256 = "sha256",
  SHA512 = "sha512",
}

export interface HmacOTP {
  /** Key: Unique shared secret key for encrypting C values for HMAC algorithm */
  key: string
  /** Digits: Return digits of HOTP value, according to RFC4226, length >= 6 */
  digits?: number
  /** Counter: 8-bytes incrementing counter value */
  counter: number
  /** Hash Algorithm: HMAC Algorithm, is one of 'sha1', 'sha256' and 'sha512' */
  algorithm?: HashAlgo
}

export interface TimeOTP {
  /** T0: Unix time to start counting time steps */
  t0?: number
  /** Key: Key for hashing */
  key: string
  /** Digits: Return digits of TOTP value, according to RFC6238, length >= 6 */
  digits?: number
  /** Epoch Time: Epoch time (Unix), defaults to current Unix time */
  epochTime?: number
  /** Time Step X: Time step in seconds, default 30s */
  timeStepX?: number
  /** Hash Algorithm: HMAC Algorithm, is one of 'sha1', 'sha256' and 'sha512' */
  algorithm?: HashAlgo
}
