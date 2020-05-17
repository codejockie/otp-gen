# OTP Gen

A customisable implementation of the HMAC based One Time Password [HOTP](https://tools.ietf.org/html/rfc4226) and Time based One Time Password [TOTP](https://tools.ietf.org/html/rfc6238).

If something doesn't work, please [file an issue](https://github.com/codejockie/otp-gen/issues)

## Installation
- npm install @codejockie/otp-gen --save

## Sample Usage:
```js
  const { hotp } = require('@codejockie/otp-gen')

  // Example of HOTP
  const hotpToken = hotp({ key: 'shared_secret', counter: 100 });

  // Example of TOTP
  const totpToken = totp({ key: 'shared_secret' });
```
