import crypto from "crypto"
import {
  decimalToHex,
  hexToDecimal,
  pad,
  padLeft,
  padRight,
  toBuffer,
  truncate,
  unix,
} from "../../src/utils"

describe("decimalToHex", () => {
  test("converts a decimal to hex string", () => {
    expect(decimalToHex(1)).toEqual("01")
    expect(decimalToHex(10)).toEqual("0a")
    expect(decimalToHex(15)).toEqual("0f")
    expect(decimalToHex(16)).toEqual("10")
  })
})

describe("hexToDecimal", () => {
  test("converts a hex string to decimal", () => {
    expect(hexToDecimal("1")).toEqual(1)
    expect(hexToDecimal("A")).toEqual(10)
    expect(hexToDecimal("f")).toEqual(15)
    expect(hexToDecimal("10")).toEqual(16)
  })
})

describe("pad", () => {
  test("returns string if string length > given length", () => {
    expect(pad("testkey", 5)).toEqual("testkey")
  })

  test("pads string by given length", () => {
    expect(pad("test", 5)).toEqual(" test")
  })

  test("pads string by given length and char", () => {
    expect(pad("test", 5, "*")).toEqual("*test")
    expect(pad("test", 8, "*")).toEqual("**test**")
    expect(pad("test", 9, "*")).toEqual("***test**")
  })
})

describe("padLeft", () => {
  test("returns string if string length > given length", () => {
    expect(padLeft("testkey", 5)).toEqual("testkey")
  })

  test("pads string left by given length", () => {
    expect(padLeft("test", 5)).toEqual(" test")
  })

  test("pads string left by given length and char", () => {
    expect(padLeft("test", 5, "*")).toEqual("*test")
    expect(padLeft("test", 8, "*")).toEqual("****test")
  })
})

describe("padRight", () => {
  test("returns string if string length > given length", () => {
    expect(padRight("testkey", 5)).toEqual("testkey")
  })

  test("pads string right by given length", () => {
    expect(padRight("test", 5)).toEqual("test ")
  })

  test("pads string right by given length and char", () => {
    expect(padRight("test", 5, "*")).toEqual("test*")
    expect(padRight("test", 9, "*")).toEqual("test*****")
  })
})

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
    const key = toBuffer("testkey")
    const counter = toBuffer(unix())
    const hash = crypto.createHmac("sha512", key).update(counter).digest("hex")
    expect(truncate(hash, 8)).toEqual("61062712")
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
