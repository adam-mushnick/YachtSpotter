import { Product } from '../../app/models/product';
import ProductList from './ProductList';

//specifying required properties to passed down to this component
interface Props {
  products: Product[];
}

export default function Catalog({products}: Props) {
  return (
    <>
<ProductList products={products}/>
    </>
  );
}
