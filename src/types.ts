import { HashAlgo } from "./"

export interface HmacOTP {
  /** Key: Unique shared secret key for encrypting C (counter) values for HMAC algorithm */
  key: string
  /** Digits: Return digits of HOTP value, according to RFC4226, length >= 6 */
  digits?: number
  /** Counter: 8-byte incrementing counter value */
  counter: number
  /** Hash Algorithm: HMAC Algorithm to use; can be one of 'sha1', 'sha256' and 'sha512' */
  algorithm?: HashAlgo
}

export interface TimeOTP {
  /** T0: Unix time to start counting time steps */
  t0?: number
  /** Key: Shared secret used for encryption */
  key: string
  /** Digits: Return digits of TOTP value, according to RFC6238, length >= 6 */
  digits?: number
  /** Epoch Time: Unix Epoch time, defaults to current Unix time */
  epochTime?: number
  /** Time Step X: Time step in seconds, default 30s */
  timeStepX?: number
  /** Hash Algorithm: HMAC Algorithm to use; can be one of 'sha1', 'sha256' and 'sha512' */
  algorithm?: HashAlgo
}
