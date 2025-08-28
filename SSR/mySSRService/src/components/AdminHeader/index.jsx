// 路由导航栏
import style from './index.css'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <header className={style.header}>
      <nav>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <Link to="/admin/home">首页</Link>
          </li>
          <li className={style.navItem}>
            <Link to="/admin/user">用户管理</Link>
          </li>
          <li className={style.navItem}>
            <Link to="/admin/system">系统管理</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AdminHeader
