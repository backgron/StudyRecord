// // 实现任意个参数任意次调用的函数相加

// // 通过函数柯里化
// function add() {
//   let args = Array.from(arguments)

//   function argsFun() {
//     args.push(...arguments)
//     return argsFun
//   }

//   argsFun.toString = function () {
//     return args.reduce((pre, cur) => {
//       return pre + cur
//     }, 0)
//   }

//   return argsFun
// }


// alert(add(1))
// alert(add(1, 2))
// alert(add(1, 2)(3))

function add(...arg) {

  function argsFun() {
    arg.push(...arguments)
    return argsFun
  }

  argsFun.getValue = function () {
    return arg.reduce((pre, cur) => {
      return pre + cur
    })
  }

  return argsFun
}
console.log(add(1).getValue())
console.log(add(1, 2).getValue())
console.log(add(1, 2)(3).getValue())