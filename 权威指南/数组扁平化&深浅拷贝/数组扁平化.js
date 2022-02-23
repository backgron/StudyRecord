//数组扁平化
let arr = [
  1,
  [2, 3, [4, 5, [6], 7], 8],
  9,
  10
]

// 1 专用API  arr.flat()
console.log(arr.flat(10));

// 2 reduce 递归
let setArr = function (arr) {
  return arr.reduce((a, b) => {
    return a.concat(Array.isArray(b) ? setArr(b) : b)
  }, [])
}
console.log(setArr(arr));

// join().split(',')   会变字符串，可以通过遍历转换
console.log(arr.join().split(','));

// 二维数组快速jin
console.log([].concat(...arr))