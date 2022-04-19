//代理进行信息验证、转发
//数据双向绑定  多继承

const validator = {
  set: function (obj, prop, value) {
    //判断属性是否存在
    if (!(prop in obj)) {
      return new Error('此属性并不存在')
    }
    console.log(prop);
    switch (prop) {
      case 'name':
        if ((typeof value) !== 'string') {
          throw new Error('输入属性有误，请从新输入')
        }
        return obj[prop] = value
      case 'age':
        if (Number.isNaN(value) && value > 120 && value < 0) {
          throw new Error('请输入正确年龄')
        }
        return obj[prop] = parseInt(value)

      case 'phone':
        if (Number.isNaN(value)) {
          throw new Error('请输入正确手机号')
        }
        return obj[prop] = parseInt(value)
    }

  },
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 2
  }
}

class Student {
  constructor(name, age, phone) {
    this.name = name
    this.age = age
    this.phone = phone
  }
}

let xiaoming = new Student('xiaoming', 15, 123321)
let xmProxy = new Proxy(xiaoming, validator)
xmProxy.name = 123
console.log(xmProxy);
console.log(xiaoming);


// //多继承

// class Person {
//   constructor(name, age, sex) {
//     this.name = name
//     this.age = age
//     this.sex = sex
//   }
// }

// class Student {
//   constructor(id, score) {
//     this.id = id
//     this.score = score
//   }
// }

// class Me {
//   constructor(me) {
//     this.me = me
//   }
// }

// let me = new Me('me is me')
// let extendTow = {
//   get: function (obj, key) {
//     return obj[key] || Student[key] || Me[key] || new Error('不存在此属性')
//   }
// }

// let meProxy = new Proxy(me, extendTow)

// meProxy.name = 'xiaoming'
// meProxy.age = 15
// meProxy.sex = 'nan'
// meProxy.id = '123123'
// meProxy.score = 99

// console.log(me)
// console.log(me.name, me.id, me.me);
// console.log(meProxy);
// console.log(meProxy.name, meProxy.id, meProxy.me);