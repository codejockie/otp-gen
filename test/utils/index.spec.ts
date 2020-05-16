import crypto from "crypto"
import { toBuffer, truncate, unix } from "../../src/utils"

describe("toBuffer", () => {
  test("throws an error for invalid arguments", () => {
    expect(() => toBuffer(null)).toThrow()
    expect(() => toBuffer(null)).toThrow("Invalid argument type supplied.")
    expect(() => toBuffer(undefined)).toThrow()
    expect(() => toBuffer(undefined)).toThrow("Invalid argument type supplied.")
  })

  test("convert argument to a buffer", () => {
    expect(toBuffer(8).toJSON()).toEqual({
      data: [0, 0, 0, 0, 0, 0, 0, 8],
      type: "Buffer",
    })
    expect(toBuffer("testkey").toJSON()).toEqual({
      data: [116, 101, 115, 116, 107, 101, 121],
      type: "Buffer",
    })
  })
})

describe("truncate", () => {
  test("should truncate hex string by the given number of digits", () => {
    jest
      .spyOn(global.Date, "now")
      .mockImplementationOnce(() =>
        new Date("2020-05-16T15:17:58.135Z").valueOf()
      )
    const keyBytes = toBuffer("testkey")
    const counterBytes = toBuffer(unix())
    const hash = crypto
      .createHmac("sha512", keyBytes)
      .update(counterBytes)
      .digest("hex")
    expect(truncate(hash, 8)).toEqual("66106271")
    expect(truncate(hash, 10)).toEqual("0661062712")
  })
})

describe("unix", () => {
  jest
    .spyOn(global.Date, "now")
    .mockImplementationOnce(() =>
      new Date("2020-05-16T15:17:58.135Z").valueOf()
    )
  test("should get the current unix epoch time", () => {
    expect(unix()).toEqual(1589642278)
  })
})
