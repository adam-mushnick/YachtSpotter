import Grid from '@mui/material/Grid';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

//responsive grid of all products
export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={2} sx={{ px: 0, py: 5 }}>
      {products.map((product) => (
        <Grid
          item
          key={product.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
