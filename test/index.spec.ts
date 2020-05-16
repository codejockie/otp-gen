import { hotp, totp } from "../src"
import { HashAlgo } from "../src/types"

describe("hotp", () => {
  test("returns hmac based otp", () => {
    // Return 6 digits (default)
    expect(hotp({ counter: 0, key: "testkey" })).toEqual("995486")
    // Returns 8
    expect(hotp({ counter: 0, key: "testkey", digits: 8 })).toEqual("99548610")
    expect(hotp({ counter: 0, key: "testkey", digits: 10 })).toEqual(
      "0995486102"
    )

    // SHA512
    expect(
      hotp({
        algorithm: HashAlgo.SHA512,
        counter: 0,
        key: "testkey",
        digits: 8,
      })
    ).toEqual("13884827")
    expect(
      hotp({
        algorithm: HashAlgo.SHA512,
        counter: 0,
        key: "testkey",
        digits: 10,
      })
    ).toEqual("1388482710")
  })
})

describe("totp", () => {
  test("returns time based otp", () => {
    jest.spyOn(global.Date, "now").mockImplementationOnce(() => 1589613052907)
    expect(totp({ key: "testkey", digits: 10 })).toEqual("0173073020")
  })
})
