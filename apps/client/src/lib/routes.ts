import { Home, type LucideIcon, ShoppingCart } from 'lucide-react'

export interface NavRoutes {
  title: string
  url: string
  icon: LucideIcon
  subItems?: {
    title: string
    url: string
  }[]
}

export const APP_ROUTES: NavRoutes[] = [
  {
    title: 'Inicio',
    url: '/',
    icon: Home,
  },
  {
    title: 'Punto de Venta',
    url: '/pos',
    icon: ShoppingCart,
  },
]
