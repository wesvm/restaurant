import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/use-auth'

export const LogoutModal = () => {
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <LogOut className="size-4" />
          <span>Cerrar sesión</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Salir</DialogTitle>
          <DialogDescription>¿Estás seguro de que deseas cerrar sesión?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setOpen(false)
              logout()
            }}
          >
            Salir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
