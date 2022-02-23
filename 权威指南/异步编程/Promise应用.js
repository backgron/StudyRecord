//加载图片
const preloadImage = function (path) {
  return new Promise(function (res, rej) {
    const img = new Image()
    img.onload = res
    img.onerror = rej
    img.src = path
  })
}

//手动模拟 async/await
// 配合Generator函数 使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。
function getFoo() {
  return new Promise(function (res, rej) {
    res('foo')
  })
}

const g = function* () {
  try {
    const foo = yield getFoo()
    console.log(foo)
  } catch (e) {
    console.log(e)
  }
}

function run(generator) {
  const it = generator();

  function go(res) {
    if (res.done) return res.value

    return res.value.then(function (value) {
      return go(it.next(value))
    }, function (error) {
      return go(it.throw(error))
    })
  }
  go(it.next())
}
run(g)