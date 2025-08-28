import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'

const makeStore = () => {
  let store
  if (global.document) {
    store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
      devTools: true,
      preloadedState: window.pageDatas || {},
    })
  } else {
    store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
      devTools: false,
    })
  }

  return store
}

export default makeStore
