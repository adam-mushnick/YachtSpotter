import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Product } from '../../app/models/product';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from '../../app/context/StoreContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  // Function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: 345,
      }}
    >
      <CardActionArea sx={{ flex: '1 1 auto' }}>
        <CardMedia
          component='img'
          height='140'
          src={product.pictureUrl}
          alt='picture of a yacht'
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {product.name}
          </Typography>
          <Typography variant='subtitle2' sx={{ pb: 1 }}>
            {formatPrice(product.price)}
          </Typography>
          <Typography variant='subtitle2' sx={{ pb: 1 }}>
            {product.type} - {product.lengthOverall} ft
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {product.description}
          </Typography>
          <Typography variant='body2' sx={{ pt: 1 }}>
            {product.quantityInStock} in stock
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size='small'
          color='primary'
        >
          Add to cart
        </LoadingButton>{' '}
        <Button
          component={Link}
          to={`${product.id}`}
          size='small'
          color='primary'
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
