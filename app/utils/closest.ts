export const closest = <T extends { x: number }>(numbers: T[], n: number) => {
  if (numbers.length < 1) {
    return numbers.at(0)
  }

  let currentNumber = numbers[0]!
  let smallestDifference = Math.abs(n - currentNumber.x)

  for (let index = 1; index < numbers.length; index++) {
    const number = numbers[index]!

    const diff = Math.abs(n - number.x)
    if (diff < smallestDifference) {
      smallestDifference = diff
      currentNumber = number
    }
  }

  return currentNumber
}
