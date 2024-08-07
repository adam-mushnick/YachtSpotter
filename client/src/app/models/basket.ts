export interface Basket {
  id: number;
  buyerId: string;
  items: BasketItem[];
}

export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  lengthOverall: number;
  type: string;
  quantity: number;
}
