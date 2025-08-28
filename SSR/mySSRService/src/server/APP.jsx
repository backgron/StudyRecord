import '../assets/global.css'
import RouteApp from '../routes/RouteApp'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

export default ({ url, store, }) => {
  return (
    <Provider store={store}>
      <StaticRouter location={url}>
        <RouteApp />
      </StaticRouter>
    </Provider>
  )
}
