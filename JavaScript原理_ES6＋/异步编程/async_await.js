// async await  是 Generator 函数的语法糖
` 优点:
    内置执行器，不用再调用 next() 方法
    更好的语义
    更广的实用性， await 后可以是Promise对象或者原始类型的值(会自动转成Promise.resolved)
    返回值是 Promise , 相比Generator返回值的Iterator 可以进一步使用then方法进行下一步操作
`

// 基本语法
async function fn() {
  let i = await asyncGetI()
  console.log(i)
  return i
}

// async 函数会返回一个 Promise 对象   返回值会被then方法接受
// 正常执行相当于返回的 Promise 的 resolve
// await 后报错相当于返回的 Promise 的 reject
async function f() {
  return 'hello'
}
fn().then(v => console.log(v)) // hello


// 模拟sleep 方法
function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
async function fn() {
  for (let i = 0; i < 5; i++) {
    console.log(i)
    sleep(1000)
  }
}
fn()


function fn(time) {
  return new Promise(resolve => {
    console.log(1);
    setTimeout(resolve, time)
  })
}

function log(n) {
  console.log(n);
  return
}

function* myac() {
  yield fn(1000)
  console.log(2)
  yield fn(1000)
  console.log(3)
  yield fn(1000)
  console.log(4)
}

function run(g) {
  function go(res) {
    if (res.done) return res.value
    res.value.then(function (value) {
      return go(g.next())
    }, function (err) {
      throw err
    })
  }
  go(g.next())
}

run(myac())