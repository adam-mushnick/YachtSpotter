import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import App from "../layouts/App";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

//routes (paths) for each page and the element component that is returned
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'catalog', element: <Catalog /> },
      { path: 'catalog/:id', element: <ProductDetails /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '/server-error', element: <ServerError /> },
      { path: '/not-found', element: <NotFound /> },
      { path: 'basket', element: <BasketPage /> },
      {path: 'checkout', element: <CheckoutPage/>},
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
]);