// 路由导航栏
import style from './index.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className={style.header}>
      <nav>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <Link to="/front/home">Home</Link>
          </li>
          <li className={style.navItem}>
            <Link to="/front/movies">Movies</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
