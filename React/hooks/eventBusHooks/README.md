# 观察者模式 

## 观察者模式  Observer Mode

### 简介

+ 观察者模式是一种**对象行为模式**。它定义对象间的一种**一对多的依赖关系**，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新

### 优点

+ 观察者模式**解除**了主题和具体观察者的**耦合**，让耦合的双方都依赖于抽象，而不是依赖具体。

### 实现

+ 实现观察者模式有很多形式，比较直观的一种是使用一种“**注册—通知—撤销注册**”的形式。

```js
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
    this.eventMap.delete(eventName)
  }
}
```

## hooks 封装

+ 提取事件注册、事件卸载、事件提交的方法，通过useEffect 配置组件加载时自动的注册和卸载。

  ```js
  export function useEvent(eventName, obj) {
    const [consumer, setConsumer] = useState()
    const unsubRef = useRef()
    const run = () => eventBus.on(eventName, obj)
    useEffect(() => {
      unsubRef.current = run()
  
      setConsumer({
        unSub: () => unsubRef.current?.(),
        emit: eventBus.emit.bind(eventBus),
        run,
      })
  
      return () => unsubRef.current?.()
    }, [])
  
    return consumer
  }
  ```

