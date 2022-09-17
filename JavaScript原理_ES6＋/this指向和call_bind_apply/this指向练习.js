function logDecorator(logger) {
  return function () {
    console.log("Logged at:", new Date().toLocaleString())
    return logger()
  }
}

class Calculator {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  multiply() {
    return this.x * this.y
  }
}

let calculator = new Calculator(10, 10)
let decoratedCalculator = logDecorator(calculator.multiply)

decoratedCalculator()
