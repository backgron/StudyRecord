import { Routes, Route } from 'react-router-dom'
import routeConfig from './routeConfig'
import NotFound from '@/pages/NotFound'

// 递归渲染路由的函数
const renderRoutes = (routes) => {
  return routes.map((route) => {
    const { key, path, component: Component, children, index } = route

    if (children && children.length > 0) {
      // 有子路由的情况
      return (
        <Route key={key} path={path} element={<Component />}>
          {children.map((child) => {
            let childPath = child.path

            if (child.index) {
              // index路由不需要path
              childPath = undefined
            } else if (child.path.startsWith('/')) {
              // 如果是绝对路径，转换为相对路径
              if (path === '/' && child.path !== '/') {
                // 父路径是根路径时，子路径去掉开头的斜杠
                childPath = child.path.slice(1)
              } else if (path !== '/' && child.path.startsWith(path)) {
                // 父路径不是根路径时，移除父路径前缀
                const remaining = child.path.slice(path.length)
                childPath = remaining.startsWith('/') ? remaining.slice(1) : remaining
              } else if (path !== '/' && !child.path.startsWith(path)) {
                // 如果子路径不包含父路径，直接去掉开头的斜杠
                childPath = child.path.slice(1)
              }
            }

            return (
              <Route
                key={child.key}
                index={child.index}
                path={childPath}
                element={<child.component />}
              />
            )
          })}
        </Route>
      )
    } else {
      // 没有子路由的情况
      return (
        <Route
          key={key}
          path={path}
          index={index}
          element={<Component />}
        />
      )
    }
  })
}

export default function RouteApp() {
  return (
    <Routes>
      {/* 根据配置渲染路由 */}
      {renderRoutes(routeConfig)}
    </Routes>
  )
}
