import { createFileRoute, Link, Outlet, redirect, useLocation } from '@tanstack/react-router'
import { ModeToggle } from '@/components/mode-toggle'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/use-auth'
import { authStorage } from '@/lib/auth-storage'
import { APP_ROUTES } from '@/lib/routes'

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
  const { user, isLoading } = useAuth()
  const location = useLocation()

  const currentRoute = APP_ROUTES.find((route) => route.url === location.pathname)
  const pageTitle = currentRoute ? currentRoute.title : 'Sistema Restaurante'

  const isHome = location.pathname === '/'

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Inicio</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {!isHome && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-4">
            {!isLoading && user && (
              <div className="flex flex-col items-end text-sm ">
                <span className="font-medium">{user.name}</span>
                <span className="text-muted-foreground">{user.role}</span>
              </div>
            )}
            <ModeToggle />
          </div>
        </header>
        <div className="container contain-size mx-auto p-4 space-y-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
