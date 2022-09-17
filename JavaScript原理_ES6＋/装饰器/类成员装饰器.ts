function enhancer(target: any, propertyKey: string) {
  console.log(target) // Person {}
  console.log("key " + propertyKey) // key name
}
class Person {
  @enhancer
  name: string
  constructor() {
    this.name = "金色小芝麻"
  }
}
const user = new Person()
user.name = "你好啊！"
console.log(user.name) // 你好啊！
