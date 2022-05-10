// promise all
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

function pro1() {
  return new Promise((res) => {
    setTimeout(() => {
      res(1111111)
    }, 500)
  })
}

function pro2() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(22222222)
    }, 500)
  })
}

function pro3() {
  return new Promise((res) => {
    setTimeout(() => {
      res(333333333)
    }, 500)
  })
}

/** 简单的promise all */
function promiseAll(ites) {
  return new Promise(async (res, rej) => {
    let resArr = []
    let count = 0

    for (let item of ites) {
      await item
        .then((value) => {
          count++
          resArr.push(value)
        })
        .catch((err) => {
          resArr.push(err)
          rej(err)
        })
    }

    if (count === ites.length) {
      return res(resArr)
    }
  })
}

async function run() {
  await promiseAll([pro1(), pro2(), pro3()])
    .then((value) => {
      console.log("全部通过 ^.^ ")
      console.log(value)
    })
    .catch((err) => {
      console.log(err)
      console.log("有没通过的 T.T")
    })
  console.log("运行结束")
}
run()
