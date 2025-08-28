import Home from '@/pages/Home'
import Movies from '@/pages/Movies'
import NotFound from '@/pages/NotFound'
import Admin from '@/pages/Admin'
import UserManage from '@/pages/Admin/UserManage'
import SystemManage from '@/pages/Admin/SystemManage'
import Front from '@/pages/front'
import AdminHome from '@/pages/Admin/Home'

export default [
  {
    key: 'admin',
    path: '/admin',
    component: Admin,
    children: [
      {
        key: 'home',
        path: '/admin/home',
        component: AdminHome,
      },
      {
        key: 'user',
        path: '/admin/user',
        component: UserManage,
      },
      {
        key: 'system',
        path: '/admin/system',
        component: SystemManage,
      },
    ],
  },
  {
    key: 'front',
    path: '/front',
    component: Front,
    children: [
      {
        key: 'index',
        component: Home,
        index: true,
      },
      {
        key: 'home',
        path: '/front/home',
        component: Home,
      },
      {
        key: 'movies',
        path: '/front/movies',
        component: Movies,
      },
    ],
  },
]
