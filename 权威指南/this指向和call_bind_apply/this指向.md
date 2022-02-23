# this指向问题  和  作用域

## 在`浏览器`中

  + 在不创建新的对象之前，所有的`this` 在调用时，都指向`window`对象

    ```js
    var a=0   // this.a=window.a=0   window作用域中的 a=0       !!!!以下注释均为执行调用过后的结果!!!!
    this      //  this = window
    function Fn(){
        var a=1  // Fn函数作用域中的 a    a=1
        this.a   // this = window   this.a = window.a =0    
    }
    Fn()
    ```

  + 在创建对象后

    ```js
    let obj = {            
      a: 1,
      fn: () => {
        console.log(this.a) //  刚创建 obj ，此时fn没有被调用，没有this的挂载
      },
      fn2: function () {
        console.log(this.a) //  刚创建 obj ，此时fn没有被调用，没有this的挂载
      }
    }
    
    obj.fn()          //fn调用，但是不挂载this  指向默认的this  仍是 window
    obj.fn2()         //fn调用时将this 挂载到obj上  此时fn中的this 为 obj
    ```

    

## 在`Node` 中

+ 再不创建新的对象前 `function` 被调用时`this` 默认挂载到 `global`（或者挂载在`global`上的其他对象，如`setInterval`的`Timeout`对象等）对象  ，function外的`this`调用时是一个公用的空对象  `{}`

~~~js
  this            //  空对象 {}                        !!!!以下注释均为执行调用过后的结果!!!!
  this.a=1        //  空对象 { a : 1 }
  
  function Fn() {
    this         //   global
    this.a = 1   //  global.a = 1
    this.b = 2   // global.b = 2
  }
  Fn()
  
  function Fn2() {
    this.b         // global.b = 2
    this.a         // global.a = 1
  }
  Fn2()
  
  let f = () => {  // 因为箭头函数的不会挂载 this  继承于上一层也就是函数外的 this = {}
    this.a         //  空对象 { a:1 }
  }
  f()
  ```

+ 在创建对象后

  ```js
  let obj = {            
    a: 1,
    fn: () => {
      console.log(this.a) //  刚创建 obj ，此时fn没有被调用，没有this的挂载
    },
    fn2: function () {
      console.log(this.a) //  刚创建 obj ，此时fn没有被调用，没有this的挂载
    }
  }
  
  obj.fn()          //fn调用，但是不挂载this  指向默认的this  仍是全局空对象  {}
  obj.fn2()         //fn调用时将this 挂载到obj上  此时fn中的this 为 obj
~~~



+ 总结

  + `this `只在被调用时会产生挂载，浏览器中的`this`默认被挂载在`window`对象上，`node`中的`this`默认被挂载在`global`上或者全局的空对象`{}`上。在被`new`或者`function`调用时，会将对象挂载到相应的对象上。箭头函数不会产生挂载`this`的行为，会沿着作用域继承关系，一直向上找，直到找到产生挂载`this`行为的地方（包括最外层的默认挂载) 

    
    
## 注意

  ```js
  // 在方法当作参数传递时，并不会因为外界产生影响，传输的只是方法本身（本质上是引用类型的值传递问题）
  let obj1 = {
    a: 1,
    fn: function () {
      console.log(this);
    }
  }
  
  let obj2 = {
    a: 2,
    fn: obj1.fn    //   相当于 obj2.fn(栈) = obj1.fn(栈)      将obj2.fn 指向 obj1.fn 指向的地址(堆)   之后就和obj1.fn(栈) 无关了
  }
  
  obj2.fn()    // obj2
  ```



