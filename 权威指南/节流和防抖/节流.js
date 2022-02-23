// 设置节流阀，让事件再某个时间段内只能执行一次

let mainFun = () => {
  console.log('主要功能')
}

// 节流函数 
function throttle(fn, time) {
  let canActive = true
  return function () {
    if (canActive) {
      canActive = false
      setTimeout(() => { //如果需要原始的this对象，可以通过apply绑定
        fn()
        canActive = true
      }, time)
    }
  }
}

let mainFunThrottle = throttle(mainFun, 3000)

setInterval(() => {
  mainFunThrottle()
}, 1000)