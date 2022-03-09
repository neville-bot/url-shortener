function base62(n) {
  // convert a number to base 62
  // base 62 are out of the base
  // let tmp = n
  let base62Num = ""
  let key = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let findBase = key.split("")
  while (n > 0) {
    let r = n % 62
    n = Math.floor(n / 62)
    base62Num = findBase[r] + base62Num
  }
  return `${base62Num}`
}

module.exports = encoding
