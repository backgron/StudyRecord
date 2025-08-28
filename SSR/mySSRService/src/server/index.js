import koa from 'koa'
import koaStatic from 'koa-static'
import path from 'path'
import render from './render'
import request from '@/services/request'

const app = new koa()

// 配置静态文件服务，指向 public 目录
app.use(koaStatic(path.resolve('public')))

// 配置转发请求 koa-router
app.use(async (ctx, next) => {
  if (ctx.path.startsWith('/mock')) {
    const res = await request({
      method: ctx.method,
      url: ctx.path,
      data: ctx.request.body,
    })
    ctx.body = res.data
  } else {
    await next()
  }
})

app.use(render)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
