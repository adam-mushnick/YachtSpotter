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

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
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
        <Button size='small' color='primary'>
          Add to cart
        </Button>
        <Button size='small' color='primary'>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
