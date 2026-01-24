import type { AdminLoginInput, LoginInput } from '@restaurant/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { authApi } from '@/lib/api/auth.api'
import { authStorage } from '@/lib/auth-storage'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.getCurrentUser,
    enabled: authStorage.isAuthenticated(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  })

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data.user)
      authStorage.setToken(data.token)
      authStorage.setUser(data.user)

      toast.success('Bienvenido', {
        description: `Hola ${data.user.name}`,
      })
      navigate({ to: '/' })
    },
  })

  const loginAdminMutation = useMutation({
    mutationFn: authApi.loginAdmin,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data.user)
      authStorage.setToken(data.token)
      authStorage.setUser(data.user)

      toast.success('Bienvenido Admin', {
        description: `Hola ${data.user.name}`,
      })
      navigate({ to: '/' })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'me'], null)
      queryClient.clear()
      authStorage.clear()
      toast.success('Sesión cerrada')
      navigate({ to: '/auth' })
    },
  })

  return {
    user,
    isLoading,
    isAuthenticated: !!user || authStorage.isAuthenticated(),

    login: (data: LoginInput) => loginMutation.mutate(data),
    loginAdmin: (data: AdminLoginInput) => loginAdminMutation.mutate(data),
    logout: () => logoutMutation.mutate(),

    isLoginLoading: loginMutation.isPending,
    isLoginAdminLoading: loginAdminMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
  }
}
