` axios 通过 promise 封装 XMLHttpRequest
  Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

  从浏览器中创建 XMLHttpRequests
  从 node.js 创建 http 请求
  支持 Promise API
  拦截请求和响应
  转换请求数据和响应数据
  取消请求
  自动转换 JSON 数据
  客户端支持防御 XSRF
`

axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

axios.all(iterable)
axios.spread(callback)

axios.create([config])