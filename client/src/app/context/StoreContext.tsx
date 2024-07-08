import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Basket } from '../models/basket';

//this file sets up a context to manage the state of the shopping basket throughout the React application
//interface defines the functions and property (the basket) that the context will have
interface StoreContextValue {
  removeItem: (productId: number, quantity: number) => void;
  setBasket: (basket: Basket) => void;
  basket: Basket | null;
}

//creating context with intial value of undefined
export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

//custom hook that uses the useContext hook to access the StoreContext
// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
  const context = useContext(StoreContext);

    //throw error if outside of the wrapper
  if (context === undefined) {
    throw Error(
      'Oops - we are not inside the app.tsx so we do not have access to the context'
    );
  }

  return context;
}

//component that wraps around parts of the app that need access to the basket state
export function StoreProvider({ children }: PropsWithChildren<unknown>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  function removeItem(productId: number, quantity: number) {
    if (!basket) return;
    const items = [...basket.items]; // new array of items
    const itemIndex = items.findIndex((i) => i.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      setBasket((prevState) => {
        return { ...prevState!, items };
      });
    }
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
