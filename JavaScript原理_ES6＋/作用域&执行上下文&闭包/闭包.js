` 闭包
  1. 闭包是指有权访问另一个函数作用域中的变量的函数
  2. 函数与其此法环境的引用，使内部函数访问到外部函数的作用域，当内部函数被创建时形成闭包
  3. 当你从函数内部返回一个内部函数时，返回的函数会保留当前闭包(上下文)
  4. 闭包的作用域链包含这他自己的作用域，以及父作用域
  5. 闭包相互独立
`

`   闭包 MDN
一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。
也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。
`

function fn() {
  var a = 1
  return function fn2() {
    console.log(a);
  }
}

let fn3 = fn()
fn3()

`  闭包常见的作用
  1. 通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
  2. 闭包的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。
  3. 函数柯里化
  4. 节流和防抖
`

// 通过闭包创建私有方法

function createCounter() {
  let num = 0

  function changeNum(val) {
    num += val
  }
  return {
    add: function () {
      changeNum(1)
    },
    del: function () {
      changeNum(-1)
    },
    value: function () {
      return num
    }

  }
}

let num1 = createCounter()
num1.add()
num1.add()
num1.add()
console.log(num1.value()); //3
let num2 = createCounter()
num2.add()
num2.add()
console.log(num2.value()); //2