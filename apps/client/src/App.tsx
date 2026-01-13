import { useEffect, useState } from 'react';
import './App.css'
import { API_URL, type Product } from '@restaurant/shared'

function App() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="card">
      <h2>Menu</h2>
      <p>API URL: {API_URL}</p>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
