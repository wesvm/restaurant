import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginInput, loginSchema } from '@restaurant/shared'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { ReusableForm } from '../reusable-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
export const StaffTab = () => {
  const { login, isLoginLoading } = useAuth()
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      employeeCode: '',
      pin: '',
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresa tu codigo de empleado</CardTitle>
        <CardDescription>Accede al sistema con tu codigo unico (ejm. W001, C001)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReusableForm id="staff-form" form={form} onSubmit={login}>
          <FormField
            control={form.control}
            name="employeeCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Codigo de empleado</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="W001"
                    className="text-2xl! font-semibold tracking-widest p-6 text-center uppercase rounded-lg"
                    disabled={isLoginLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pin</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="0000"
                    className="text-2xl! font-semibold tracking-widest p-6 text-center uppercase rounded-lg"
                    maxLength={4}
                    disabled={isLoginLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button form="staff-form" type="submit" className="w-full" disabled={isLoginLoading}>
            {isLoginLoading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>
        </ReusableForm>
      </CardContent>
    </Card>
  )
}
