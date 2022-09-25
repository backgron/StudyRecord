// 模块a
const moduleA = {
  done: false,
  name: "moduleA",
}
// 模块b
const moduleB = {
  __dir: "../",
  done: false,
  name: "moduleB",
}

// 缓存区
const cache = {}

// 获取组件的办法
const loading = (module) => {
  // 拷贝
  const cloneModule = { ...module }
  // 赋初始值  如 __dirname\export\module\require 等
  cloneModule.__dirname = "../"
  // 返回
  return module
}

const myRequire = (moduleName, module) => {
  if (cache[moduleName]) {
    console.log("从cache中加载了" + moduleName)
    return cache[moduleName]
  } else {
    console.log("loading加载了模块" + moduleName)
    return (cache[moduleName] = loading(module))
  }
}

// 入口文件
function main() {
  const a = myRequire("moduleA", moduleA)
  const b = myRequire("moduleB", moduleB)
  myRequire("moduleA", moduleA)
}

main()
