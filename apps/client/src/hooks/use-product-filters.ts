import type { GetProductsQuery } from '@restaurant/shared/validators'
import { useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'
import { Route } from '@/routes/_layout/pos'
import { useDebounce } from './use-debounce'

interface ProductFilters {
  search: string
  categoryId?: number
  isAvailable?: boolean
  page: number
  limit: number
}

export function useProductFilters() {
  const navigate = Route.useNavigate()
  const searchParams = useSearch({ strict: false }) as Partial<ProductFilters>

  const filters: ProductFilters = useMemo(
    () => ({
      search: searchParams.search || '',
      categoryId: searchParams.categoryId,
      isAvailable: searchParams.isAvailable,
      page: searchParams.page || 1,
      limit: searchParams.limit || 20,
    }),
    [searchParams]
  )

  const debouncedSearch = useDebounce(filters.search, 500)

  const queryParams: GetProductsQuery = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      categoryId: filters.categoryId,
      isAvailable: filters.isAvailable,
      page: filters.page,
      limit: filters.limit,
    }),
    [debouncedSearch, filters.categoryId, filters.isAvailable, filters.page, filters.limit]
  )

  const setFilters = (updates: Partial<ProductFilters>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...updates,
        page: updates.page !== undefined ? updates.page : 1,
      }),
      replace: true,
    })
  }

  const setSearch = (search: string) => setFilters({ search })
  const setCategoryId = (categoryId?: number) => setFilters({ categoryId })
  const setPage = (page: number) => setFilters({ page })
  const setLimit = (limit: number) => setFilters({ limit })
  const toggleAvailable = () =>
    setFilters({
      isAvailable: filters.isAvailable === undefined ? true : undefined,
    })

  const clearFilters = () => {
    navigate({
      search: () => ({
        search: '',
        categoryId: undefined,
        isAvailable: undefined,
        page: 1,
        limit: 20,
      }),
      replace: true,
    })
  }

  const hasActiveFilters = useMemo(() => {
    return !!(filters.search || filters.categoryId || filters.isAvailable !== undefined)
  }, [filters])

  return {
    filters,
    queryParams,

    setFilters,
    setSearch,
    setCategoryId,
    setPage,
    setLimit,
    toggleAvailable,
    clearFilters,

    hasActiveFilters,
    isSearching: filters.search !== debouncedSearch, // Indica si está escribiendo
  }
}
