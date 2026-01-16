import { createFileRoute } from '@tanstack/react-router'
import { ChefHat } from 'lucide-react'
import { AdminTab } from '@/components/auth/admin-tab'
import { StaffTab } from '@/components/auth/staff-tab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Route = createFileRoute('/auth')({
  component: Auth,
})

function Auth() {
  return (
    <main className="h-dvh flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-accent p-3 rounded-lg">
              <ChefHat className="size-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Restaurante POS</h1>
          <p className="text-muted-foreground">Inicio de sesión rápido</p>
        </div>
        <Tabs defaultValue="staff">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="staff">Empleado</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="staff">
            <StaffTab />
          </TabsContent>
          <TabsContent value="admin">
            <AdminTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
