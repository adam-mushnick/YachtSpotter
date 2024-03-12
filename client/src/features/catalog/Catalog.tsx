import { Product } from "../../app/models/product";

//specifying required properties to passed down to this component
interface Props{
  products: Product[];
}

export default function Catalog(props: Props) {
  return (
    <>
      <ul>
        {props.products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </>
  );
}
