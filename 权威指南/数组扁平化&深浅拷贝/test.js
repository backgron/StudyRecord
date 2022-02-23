// 拷贝原型链

class F {
  constructor(f = 'ffffff') {
    this.f = f
  }

  fun() {
    console.log('f fun');
  }
}

class S extends F {
  constructor(s = 'sssssssss') {
    super()
    this.s = s
  }
}

let s = new S()

let a = {
  ...s
}

let b = Object.create(Object.getPrototypeOf(s), Object.getOwnPropertyDescriptors(s))
console.log(b);
// console.log(a.fun());