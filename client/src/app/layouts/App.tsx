import { useEffect, useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Product } from '../models/product';
import Header from './Header';
import { Container, CssBaseline } from '@mui/material';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Container sx={{p: 0}}>
        <Catalog products={products} />
      </Container>
    </>
  );
}

export default App;
