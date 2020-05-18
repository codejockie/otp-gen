import { HashAlgo, hotp, totp } from "../src"

describe("hotp", () => {
  test("returns hmac based otp", () => {
    // Return 6 digits (default)
    expect(hotp({ counter: 0, key: "testkey" })).toEqual("486102")
    // Returns 8
    expect(hotp({ counter: 0, key: "testkey", digits: 8 })).toEqual("95486102")
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
    ).toEqual("88482710")
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
  test("uses the default digits of 6", () => {
    jest.spyOn(global.Date, "now").mockImplementationOnce(() => 1589613052907)
    expect(totp({ algorithm: HashAlgo.SHA512, key: "testkey", t0: 1000 })).toEqual("182635")
  })

  test("allows custom return digits", () => {
    jest.spyOn(global.Date, "now").mockImplementationOnce(() => 1589613052907)
    expect(totp({ key: "testkey", digits: 10 })).toEqual("0173073020")
  })

  test("allows different hash algorithm", () => {
    jest.spyOn(global.Date, "now").mockImplementationOnce(() => 1589613052907)
    expect(totp({ algorithm: HashAlgo.SHA512, key: "testkey", digits: 10 })).toEqual("2134214641")
  })

  test("allows custom t0", () => {
    jest.spyOn(global.Date, "now").mockImplementationOnce(() => 1589613052907)
    expect(totp({ algorithm: HashAlgo.SHA512, key: "testkey", digits: 10, t0: 1000 })).toEqual("1508182635")
  })

  test("allows custom time step X", () => {
    jest.spyOn(global.Date, "now").mockImplementationOnce(() => 1589613052907)
    expect(totp({ algorithm: HashAlgo.SHA512, key: "testkey", digits: 8, timeStepX: 60 })).toEqual("53340704")
  })

  test("allows custom epoch time", () => {
    jest.spyOn(global.Date, "now").mockImplementationOnce(() => 1589613052907)
    expect(totp({ algorithm: HashAlgo.SHA512, digits: 8, epochTime: 1591714800, key: "testkey", timeStepX: 60 })).toEqual("83475233")
  })
})
