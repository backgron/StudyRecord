## Object.fromEntries()  迭代器/键值对数组转对象
+ Object.fromEntries() 方法把键值对列表转换为一个对象。
```js
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

const obj = Object.fromEntries(entries);

// { foo: "bar", baz: 42 }
console.log(obj);
```

## Intersection Observer 
+ 监听元素是否在可视区