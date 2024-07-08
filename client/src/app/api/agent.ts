//the file in client side code that handles HTTP requests to the API backend service

//promise-based HTTP client for the browser and Node.js
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';

//utility fn: simulates a delay in resonse interceptor
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

//set baseurl for axios requests
axios.defaults.baseURL = 'http://localhost:5000/api/';
//cross-site Access-Control requests should be made using credentials
axios.defaults.withCredentials = true;

//fn that extracts and returns 'data' prop from an axios response
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  //on success, use sleep for short delay
  async (response) => {
    await sleep();
    return response;
  },
  //error handler, handle and show error messages with Toast
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        router.navigate('/server-error', { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

//requests object
//a set of functions for making HTTP requests and returning the response data
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

//API endpoints and the methods called for each request
const Catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorised'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  getValidationError: () => requests.get('buggy/validation-error'),
};

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.del(`basket?productId=${productId}&quantity=${quantity}`),
};

//exporting
const agent = {
  Catalog,
  TestErrors,
  Basket,
};

export default agent;
