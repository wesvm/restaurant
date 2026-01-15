import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

export const Route = createFileRoute('/_layout/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { user, isLoading, logout, isLogoutLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="space-y-6 pb-16 md:pb-0">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido, {user?.name} ({user?.role})
          </p>
        </div>

        <Button variant="outline" onClick={() => logout()} disabled={isLogoutLoading}>
          {isLogoutLoading ? 'Cerrando...' : 'Cerrar Sesión'}
        </Button>
      </div>
    </div>
  )
}
