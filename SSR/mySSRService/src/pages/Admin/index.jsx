import { Link, Outlet } from "react-router-dom"
import AdminHeader from "@/components/AdminHeader"

export default function Admin() {
  return (
    <div>
      <h1>后台管理</h1>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
