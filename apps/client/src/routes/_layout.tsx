import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authStorage } from '@/lib/auth-storage'

export const Route = createFileRoute('/_layout')({
  component: Layout,
  beforeLoad: async () => {
    if (!authStorage.isAuthenticated()) {
      throw redirect({
        to: '/auth',
      })
    }
  },
})

function Layout() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <Outlet />
    </main>
  )
}
