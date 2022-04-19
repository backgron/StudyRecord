//IoC  控制反转
class Container {
  //  存储依赖对象的信息
  bindMap = new Map()

  //绑定依赖对象
  bind(identifier: string, clazz: any, constructorArgs: Array<any> = []) {
    this.bindMap.set(identifier, {
      clazz,
      constructorArgs
    })
  }

  // 实例的获取
  get<T>(identifier: string): T {
    const target = this.bindMap.get(identifier)
    const { clazz, constructorArgs } = target
    return Reflect.construct(clazz, constructorArgs)
  }
}

const container = new Container()

class A {
  p: number
  constructor(p: number) {
    this.p = p
  }
}

class B {
  a: A
  constructor() {
    this.a = container.get('a')
  }
}

container.bind('a', A, [10])
container.bind('b', B)

let b = container.get('b')
console.log(b)





