const cpfLengthWithOnlyNumbers = /^\d{11}$/

export default function isValidCPF(value: string) {
  if (typeof value !== 'string' || !cpfLengthWithOnlyNumbers.test(value))
    return false

  // starts by assuming that everyone has the same number and then checking its
  let isFullSameNumber = true

  for (let i = 1; i < 11; i += 1) {
    if (value[i] !== value[i - 1]) {
      isFullSameNumber = false
      break
    }
  }

  if (isFullSameNumber) return false

  // validate digit 1
  let sum1 = 0

  for (let i = 0; i < 9; i += 1) {
    sum1 += Number(value[i]) * (10 - i)
  }

  const res1 = 11 - (sum1 % 11)
  const checkDigit1 = res1 >= 10 ? 0 : res1

  if (checkDigit1 !== Number(value[9])) return false

  // validate digit 2
  let sum2 = 0

  for (let i = 0; i < 10; i += 1) {
    sum2 += Number(value[i]) * (11 - i)
  }

  const res2 = 11 - (sum2 % 11)
  const checkDigit2 = res2 >= 10 ? 0 : res2

  if (checkDigit2 !== Number(value[10])) return false

  return true
}
