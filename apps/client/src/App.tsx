import { API_URL, type Product } from '@restaurant/shared'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <div className="p-4 ">
      <h2>Menu</h2>
      <p>API URL: {API_URL}</p>
      <ul className="list-disc pl-6">
        {products.map((product: Product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <Button className="mt-4">Order Now</Button>
    </div>
  )
}

export default App
