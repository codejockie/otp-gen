import { pad, padLeft, padRight } from "../../src/utils/pad"

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
