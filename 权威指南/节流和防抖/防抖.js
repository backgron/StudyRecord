// // 在一段时间内多次触发事件仅仅执行最后一次(也可以仅执行第一次) （先限制，后执行）


// let mainFun = () => {
//   console.log('主要功能')
// }

// //防抖函数
// let antiShake = function (fn, time) {
//   let hasTimer
//   return function () {
//     if (hasTimer) {
//       clearTimeout(hasTimer) // 如果存在，删除旧的，创建新的，按照新的计时
//     }
//     hasTimer = setTimeout(() => {
//       mainFun()
//     }, time)
//   }
// }

// let mainFunAntiShake = antiShake(mainFun, 1000)


// let i = 0
// let timeId = setInterval(() => {
//   mainFunAntiShake()
//   if (i < 30) {
//     i++
//   } else {
//     clearInterval(timeId)
//   }
// }, 100)