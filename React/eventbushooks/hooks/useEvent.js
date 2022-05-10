import { useEffect, useRef, useState } from "react"
import { eventBus } from "./EventBus"

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
