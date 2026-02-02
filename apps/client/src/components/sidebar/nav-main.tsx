import { Link, useLocation } from '@tanstack/react-router'
import { SidebarMenu, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import type { NavRoutes } from '@/lib/routes'

export function NavMain({ items }: { items: NavRoutes[] }) {
  const location = useLocation()
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuButton
          key={item.title}
          isActive={
            item.url === '/'
              ? location.pathname === item.url
              : location.pathname.startsWith(item.url)
          }
          tooltip={item.title}
          asChild
        >
          <Link to={item.url} onClick={() => setOpenMobile(false)}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      ))}
    </SidebarMenu>
  )
}
