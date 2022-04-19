/** @format */

import { useRef, useEffect } from "react"

class EventBus {
  constructor() {
    this.eventMap = new Map()
  }

  on(eventName, obj) {
    if (!this.eventMap.get(eventName)) {
      this.eventMap.set(eventName, new Set())
    }

    this.eventMap.get(eventName).add(obj)

    return () => {
      obj?.finally?.()
      this.eventMap.get(eventName).delete(obj)
    }
  }

  emit(eventName, ...args) {
    if (!this.eventMap.get(eventName)) {
      return console.warn(
        eventName + "事件不存在于当前EventBus，可能是还未定义或者已经删除"
      )
    }
    this.eventMap.get(eventName)?.forEach((item) => {
      item.next(...args)
    })
  }

  removeEvent(eventName) {
    // 清除 set的副作用
    this.eventMap.delete(eventName)
  }
}

export const eventBus = new EventBus()
