import { createFileRoute } from '@tanstack/react-router'
import { StaffTab } from '@/components/auth/staff-tab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Route = createFileRoute('/auth')({
  component: Auth,
})

function Auth() {
  return (
    <main className="h-dvh flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Tabs defaultValue="staff">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="staff">Staff Login</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="staff">
            <StaffTab />
          </TabsContent>
          <TabsContent value="admin">admin login form</TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
