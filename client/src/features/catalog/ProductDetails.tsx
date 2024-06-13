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
  Typography,
} from '@mui/material';
import { Product } from '../../app/models/product';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h3>...Loading</h3>;

  if (!product) return <h3>Product not found</h3>;

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
        </Grid>
      </Grid>
    </Container>
  );
}
