//当数组中全是值类型或者只判断引用类型地址时
let arr = [1, 2, 1, '111', '222', '111']

// 1. Set
console.log([...new Set(arr)])

//2. Map
let map = new Map()
arr.forEach(item => {
  if (!map.has(item)) {
    map.set(item, 0)
  }
});
console.log(Array.from(map.keys()))

//3 reduce/map/filter + include/indexOf
console.log(arr.reduce((a, b) => {
  return a.includes(b) ? a : a.concat(b)
}, []))