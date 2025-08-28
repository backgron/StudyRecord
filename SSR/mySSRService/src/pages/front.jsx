import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'

export default function Front() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
