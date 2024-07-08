import {
  Box,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Product } from '../../app/models/product';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layouts/LoadingComponent';
import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';

export default function ProductDetails() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  //quantity of product with initial value of zero
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    id &&
      agent.Catalog.details(parseInt(id))
        .then((response) => setProduct(response))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id, item]);

  //update quantity in text field, block from going lower than zero
  function handleInputChange(event: any) {
    if (event.target.value >= 0) setQuantity(parseInt(event.target.value));
  }

  //update cart quantities
  function handleUpdateCart() {
    if (!product) return;
    setSubmitting(true);
    if (!item || quantity > item?.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product.id, updatedQuantity)
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product.id, updatedQuantity)
        .then(() => removeItem(product.id, updatedQuantity))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    }
  }

  if (loading) return <LoadingComponent message='Loading product...' />;

  if (!product) return <NotFound />;

  return (
    <Container>
      <Grid container spacing={12} sx={{ mt: { md: 2, xs: 0 } }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={product.pictureUrl}
              alt={product.name}
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h3'>{product.name}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant='h4'>
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Length Overall</TableCell>
                  <TableCell>{product.lengthOverall}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in Stock</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} sx={{ mt: { md: 2, xs: 0 } }}>
            <Grid item xs={6}>
              <TextField
                onChange={handleInputChange}
                variant='outlined'
                type='number'
                label='Quantity in Cart'
                fullWidth
                value={quantity}
              />
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                disabled={item?.quantity === quantity || !item && quantity === 0}
                loading={submitting}
                onClick={handleUpdateCart}
                sx={{ height: '55px' }}
                color='primary'
                size='large'
                variant='contained'
                fullWidth
              >
                {item ? 'Update Quantity' : 'Add to Cart'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
