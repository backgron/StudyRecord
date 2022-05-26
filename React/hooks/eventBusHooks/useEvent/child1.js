import React, { useState } from "react"
import { useEvent } from "../hooks/useEvent"

export default () => {
  const [count, setCount] = useState(0)

  const handlerObj = {
    next: () => {
      console.log("child1 接收到了自定义事件1")
      setCount((count) => count + 1)
    },
  }

  const custom1 = useEvent("自定义1", handlerObj)

  return (
    <div>
      <h1>我是Child1 目前我的count:{count}</h1>
      <button onClick={() => custom1.unSub("自定义1")}>
        移除监听事件自定义1
      </button>
      <button onClick={() => custom1.run("自定义1", handlerObj)}>添加</button>
      <button onClick={() => custom1.emit("自定义2")}>触发自定义2</button>
    </div>
  )
}
