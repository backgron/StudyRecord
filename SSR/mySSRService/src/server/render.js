import React from 'react'
import ReactDOMServer from 'react-dom/server'
import APP from './APP'
import getScript from './getScript'
import getLink from './getLink'
import loadData from './loadData'
import makeStore from '../store'

export default async (ctx) => {
  const store = makeStore()
  await loadData(ctx, store)

  const appString = ReactDOMServer.renderToString(
    <APP url={ctx.request.url} store={store} />
  )

  ctx.body = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>mySSRService</title>
    <link rel="shortcut icon" href="https://zh-hans.react.dev/favicon.ico" type="image/x-icon" />
    ${getLink()}
  </head>
  <body>
    <div>This is template</div>
    <div id="root">${appString}</div>
    <script>
      window.pageDatas = ${JSON.stringify(store.getState())};
      window.requestPath = ${JSON.stringify(ctx.request.path)};
    </script>
    ${getScript()}
  </body>
  </html>`
}
