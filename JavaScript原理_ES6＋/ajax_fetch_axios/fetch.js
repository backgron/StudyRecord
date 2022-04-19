` Fetch 提供了一个JavaScript接口，用于访问操作HTTP管道的一些具体部分
`

` 与AJAX的区别
  1. 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，
  即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve 
  （如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false ），
  仅当网络故障时或请求被阻止时，才会标记为 reject。
  2. fetch 不会发送跨域 cookies，除非你使用了 credentials 的初始化选项。
  `

fetch(path, config).then(response => {})