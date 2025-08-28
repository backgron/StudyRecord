import routeConfig from '../routes/routeConfig'

// 从routeConfig中获取到对应路由的组件
export default async function (ctx, store) {
  const path = ctx.request.url

  // 根据路径找到对应的路由组件
  const findRoute = (routes) => {
    for (const route of routes) {
      // 处理index路由
      if (route.index && path === '/front') {
        return route
      }

      // 处理普通路由
      if (route.path === path) {
        return route
      }

      // 处理子路由
      if (route.children) {
        const childRoute = findRoute(route.children)
        if (childRoute) {
          return childRoute
        }
      }
    }
    return null
  }
  const matchedRoute = findRoute(routeConfig)
  if (
    matchedRoute &&
    matchedRoute.component &&
    matchedRoute.component.loadData
  ) {
    // 如果组件有loadData方法，调用它获取数据
    await matchedRoute.component.loadData(store)
  }
}
