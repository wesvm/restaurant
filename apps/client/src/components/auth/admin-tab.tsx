import { zodResolver } from '@hookform/resolvers/zod'
import { type AdminLoginInput, adminLoginSchema } from '@restaurant/shared/validators'
import { useForm } from 'react-hook-form'
import { ReusableForm } from '@/components/reusable-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'

export const AdminTab = () => {
  const { loginAdmin, isLoginAdminLoading } = useAuth()
  const form = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inicio de Sesión</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder como administrador</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReusableForm id="admin-form" form={form} onSubmit={loginAdmin}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="admin"
                    autoComplete="username"
                    disabled={isLoginAdminLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    autoComplete="current-password"
                    disabled={isLoginAdminLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </ReusableForm>

        <Button form="admin-form" type="submit" className="w-full" disabled={isLoginAdminLoading}>
          {isLoginAdminLoading ? 'Iniciando...' : 'Iniciar Sesión'}
        </Button>
      </CardContent>
    </Card>
  )
}
