import '../assets/global.css'
import RouteApp from '../routes/RouteApp'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import makeStore from '../store'


const store = makeStore()


export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouteApp />
      </BrowserRouter>
    </Provider>
  )
}
