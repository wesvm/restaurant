import { createFileRoute } from '@tanstack/react-router'
import { Search, X } from 'lucide-react'
import { CategoryList } from '@/components/pos/category-list'
import { LoadingProductCard, ProductCard } from '@/components/pos/product-card'
import { ProductPagination } from '@/components/pos/product-pagination'
import { Button } from '@/components/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Input } from '@/components/ui/input'
import { useProductFilters } from '@/hooks/use-product-filters'
import { useProducts } from '@/hooks/use-products'

export const Route = createFileRoute('/_layout/pos')({
  component: Pos,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      search: (search.search as string) || '',
      categoryId: search.categoryId ? Number(search.categoryId) : undefined,
      isAvailable: search.isAvailable as boolean | undefined,
      page: Number(search.page) || 1,
      limit: Number(search.limit) || 20,
    }
  },
})

function Pos() {
  const {
    filters,
    hasActiveFilters,
    queryParams,
    setSearch,
    setPage,
    setCategoryId,
    toggleAvailable,
    clearFilters,
  } = useProductFilters()
  const { data, isLoading } = useProducts(queryParams)

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="w-full pl-8"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={filters.isAvailable !== undefined ? 'default' : 'outline'}
            size="sm"
            onClick={toggleAvailable}
          >
            Solo disponibles
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="size-4 mr-1" />
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      <CategoryList selectedCategoryId={filters.categoryId} onSelectCategory={setCategoryId} />

      {isLoading && <LoadingProductCard />}

      {!isLoading && data && (
        <>
          <div className="relative">
            {data.products.length === 0 ? (
              <Empty className="border border-dashed">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Search className="size-4" />
                  </EmptyMedia>
                  <EmptyTitle>No se encontraron productos</EmptyTitle>
                  <EmptyDescription>Intenta con otros filtros</EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                {data.products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {data.pagination.totalPages > 1 && (
            <ProductPagination
              currentPage={data.pagination.page}
              totalPages={data.pagination.totalPages}
              onPageChange={setPage}
            />
          )}

          <div className="text-sm text-muted-foreground text-center">
            Mostrando {data.products.length} de {data.pagination.total} productos
          </div>
        </>
      )}
    </>
  )
}
