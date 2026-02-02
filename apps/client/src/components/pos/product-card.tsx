import type { ProductsResponse } from '@restaurant/shared/dtos'
import { Heart, Minus, Package, Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: ProductsResponse['products'][0]
  onClick?: () => void
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0)

  const handleIncrement = () => setQuantity((prev) => prev + 1)
  const handleDecrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))

  return (
    <Card
      className="overflow-hidden border-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-0 cursor-pointer h-28 w-full"
      onClick={onClick}
    >
      <CardContent className="flex p-0 h-full">
        <div className="size-28 shrink-0 rounded-bl-lg rounded-tl-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <Package className="size-10 text-gray-400" />
        </div>

        <div className="flex flex-col flex-1 justify-between p-3 min-w-0">
          <div>
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-sm leading-tight line-clamp-1 flex-1">
                {product.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 p-0 shrink-0 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Heart size={14} />
              </Button>
            </div>

            {product.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-snug">
                {product.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="font-bold text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
              {formatPrice(product.price)}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              {quantity > 0 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7 rounded-full border-gray-300"
                    onClick={handleDecrement}
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="text-sm font-medium w-5 text-center">{quantity}</span>
                </>
              )}

              <Button
                variant={quantity > 0 ? 'default' : 'secondary'}
                size="icon"
                className={`size-7 rounded-full ${quantity === 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                onClick={handleIncrement}
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const LoadingProductCard = () => {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <li key={index}>
          <Skeleton className="h-28 w-full rounded-lg" />
        </li>
      ))}
    </ul>
  )
}
