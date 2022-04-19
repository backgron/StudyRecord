/** @format */

import { useState } from "react"
import { useEvent } from "../hooks/useEvent"
import Child2 from "./child2"
import Child1 from "./child1"

export function Test2() {
  const [count, setCount] = useState(0)

  const event = useEvent()

  const handlerObj2 = {
    next: () => {
      console.log("child2 接收到了自定义事件2")
      setCount((count) => count + 1)
    },
  }
  const custom2 = useEvent("自定义2", handlerObj2)

  return (
    <div className="App">
      <h1>我是父组件 {count}</h1>
      <button onClick={() => event.emit("自定义1")}>
        点击我触发 '自定义1' 事件
      </button>
      <hr />
      <Child2 />
      <Child1 />
    </div>
  )
}
