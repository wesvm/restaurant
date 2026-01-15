import type { LoginInput } from '@restaurant/shared'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'

export const StaffTab = () => {
  const { login, isLoginLoading } = useAuth()
  const [employeeCode, setEmployeeCode] = useState('')
  const [pin, setPin] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data: LoginInput = {
      employeeCode,
      pin,
    }

    login(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresa tu codigo de empleado</CardTitle>
        <CardDescription>Accede al sistema con tu codigo unico (ejm. W001, C001)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
            disabled={isLoginLoading}
            placeholder="W001"
            className="text-2xl! font-semibold tracking-widest p-6 text-center uppercase rounded-lg"
          />

          <Input
            type="password"
            placeholder="PIN (4 dígitos)"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            disabled={isLoginLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoginLoading}>
            {isLoginLoading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
