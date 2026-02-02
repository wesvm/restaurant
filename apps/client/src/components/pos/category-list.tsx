import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useCategories } from '@/hooks/use-categories'
import { cn } from '@/lib/utils'

interface CategoryListProps {
  selectedCategoryId?: number
  onSelectCategory: (categoryId?: number) => void
}

export const CategoryList = ({ selectedCategoryId, onSelectCategory }: CategoryListProps) => {
  const { data, isLoading } = useCategories()

  if (isLoading) return <LoadingCategoryList />

  if (!data || data.length === 0) {
    return null
  }

  return (
    <ul className="flex items-center gap-x-2 overflow-x-auto">
      <li>
        <Button
          variant={selectedCategoryId === undefined ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectCategory(undefined)}
          className="shrink-0"
        >
          Todas
          {/* {selectedCategoryId === undefined && (
          <span className="ml-2 text-xs opacity-70">
            ({data.reduce((sum, cat) => sum + cat.productCount, 0)})
          </span>
        )} */}
        </Button>
      </li>

      {data.map((category) => (
        <li key={category.id}>
          <Button
            variant={selectedCategoryId === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelectCategory(category.id)}
            className={cn('shrink-0', category.productCount === 0 && 'opacity-50')}
            disabled={category.productCount === 0}
          >
            {category.name}
            {/* <span className="ml-2 text-xs opacity-70">({category.productCount})</span> */}
          </Button>
        </li>
      ))}
    </ul>
  )
}

const LoadingCategoryList = () => {
  return (
    <ul className="flex items-center gap-x-2 overflow-x-auto">
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index}>
          <Skeleton className="h-8 w-24 rounded-md" />
        </li>
      ))}
    </ul>
  )
}
