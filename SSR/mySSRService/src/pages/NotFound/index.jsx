import { Link } from "react-router-dom"

export default function NotFound(props) {

  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to="/front">返回首页</Link>
      <Link to="/admin">返回后台</Link>
    </div>
  )
}
