import { useEffect, useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Product } from '../models/product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  });

  return (
    <div>
      <h1>YachtSpotter</h1>
      <Catalog products={products} />
    </div>
  );
}

export default App;
