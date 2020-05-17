import crypto from "crypto"

import { toBuffer, truncate, unix } from "./utils"
import { HmacOTP, TimeOTP } from "./types"

/*
  HOTP and TOTP Specs
  HOTP: https://tools.ietf.org/html/rfc4226
  TOTP: https://tools.ietf.org/html/rfc6238
*/

const T0 = 0
const DIGITS = 6
const TIME_STEP_X = 30

export enum HashAlgo {
  SHA1 = "sha1",
  SHA256 = "sha256",
  SHA512 = "sha512",
}

/**
 * Generates a HMAC Based OTP
 */
export function hotp(config: HmacOTP): string | number {
  const { digits = DIGITS, algorithm = HashAlgo.SHA1 } = config
  const keyBytes = toBuffer(config.key)
  const counterBytes = toBuffer(config.counter)
  const hash = crypto
    .createHmac(algorithm, keyBytes)
    .update(counterBytes)
    .digest("hex")

  return truncate(hash, digits)
}

/**
 * Generates a Time Based OTP
 */
export function totp(config: TimeOTP): string | number {
  const {
    key,
    t0 = T0,
    epochTime,
    digits = DIGITS,
    timeStepX = TIME_STEP_X,
    algorithm = HashAlgo.SHA1,
  } = config
  const counter = Math.floor(
    ((!epochTime ? unix() : epochTime) - t0) / timeStepX
  )

  return hotp({ key, counter, algorithm, digits })
}
