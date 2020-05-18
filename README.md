# OTP Gen

[![Build Status](https://travis-ci.org/codejockie/otp-gen.svg?branch=master)](https://travis-ci.org/codejockie/otp-gen)
[![codecov](https://codecov.io/gh/codejockie/otp-gen/branch/master/graph/badge.svg)](https://codecov.io/gh/codejockie/otp-gen)
![npm](https://img.shields.io/npm/v/@codejockie/otp-gen?style=flat-square)
<!-- ![npm](https://img.shields.io/npm/dm/@codejockie/otp-gen?style=flat-square) -->

A One Time Password generator with a customisable implementation of the HMAC based One Time Password [HOTP](https://tools.ietf.org/html/rfc4226) and Time based One Time Password [TOTP](https://tools.ietf.org/html/rfc6238).

## Installation
`npm install @codejockie/otp-gen`

## Code Sample:
```js
  import { hotp, totp } from "@codejockie/otp-gen"

  // HOTP
  const hotpToken = hotp({ key: "shared_secret", counter: 20 })

  // TOTP
  const totpToken = totp({ key: "shared_secret" })
```

## API

### HOTP
HMAC based One Time Password (HOTP) function takes an `object` as an argument as follows:

Key             | Type      | Default   | Value Description
---------       | --------- | -------   | -----------------
`key`           | `string`  |   -       | Unique shared secret key for encrypting C (counter) values for HMAC algorithm
`counter`       | `number`  |   -       | 8-byte incrementing counter value
`algorithm`     | `HashAlgo`| `"sha1"`  | HMAC Algorithm to use
`digits`        | `number`  | `6`       | Return digits of HOTP value, according to RFC4226, `length >= 6`


### TOTP
Time based One Time Password (TOTP) function takes an `object` as an argument as follows:

Key             | Type      | Default           | Value Description
---------       | --------- | -------           | -----------------
`key`           | `string`  |   -               | Shared secret used for encryption
`epochTime`     | `number`  | Current Unix time | Unix Epoch time, defaults to current Unix time
`t0`            | `number`  | `0`               | Unix time used to start counting time steps
`timeStepX`     | `number`  | `30`              | Time step in seconds, default `30s`
`algorithm`     | `HashAlgo`| `"sha1"`          | HMAC Algorithm to use
`digits`        | `number`  | `6`               | Return digits of TOTP value, according to RFC6238, `length >= 6`

> `HashAlgo` is an enum consisting of these values: `"sha1" | "sha256" | "sha512"`

## Examples:

### Using a different hashing algorithm

```js
import { hotp } from "@codejockie/otp-gen"

hotp({
  key: "shared_secret",
  counter: 12345,
  algorithm: "sha256",
});
```

### Using a different return digits

```js
import { totp } from "@codejockie/otp-gen"

hotp({
  key: "shared_secret",
  counter: 12345,
  digits: 10,
});
```
### Using a different unix time

```js
import { totp } from "@codejockie/otp-gen"

totp({
  key: "shared_secret",
  epochTime: 123456
});
```

### Using a different `T0` and  `Time Step X`

```js
import { totp } from "@codejockie/otp-gen"

totp({
  key: "shared_secret",
  t0: 10,
  timeStepX: 60,
});
```

## TypeScript
This library has first hand support for TS.

### TypeScript Usage
```ts
  import { HashAlgo, hotp, totp } from "@codejockie/otp-gen"

  // HOTP
  const hotpToken = hotp({ key: "shared_secret", counter: 20, algorithm: HashAlgo.SHA512 })

  // TOTP
  const totpToken = totp({ key: "shared_secret", algorithm: HashAlgo.SHA512 }) 
```

## Contributing
Pull Requests are welcomed!

## Issues
Please [file an issue](https://github.com/codejockie/otp-gen/issues) if you encounter any.
