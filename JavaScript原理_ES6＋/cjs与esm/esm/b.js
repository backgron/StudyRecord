import a from "./a.js"

console.log("进入B")
// console.log(a)
Promise.resolve().then(() => console.log(a))

let bar = "从B中导出的bar"

export default bar
