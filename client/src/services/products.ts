import axios from "axios";
import { apiBaseUrl } from "../constants";
import { NewProductEntry, Product } from "../types";

const getAll = async () => {
  const response = await axios.get<Product[]>(`${apiBaseUrl}/products`);
  return response.data;
};

const addProduct = async (newProduct: NewProductEntry) => {
  const response = await axios.post<Product>(
    `${apiBaseUrl}/products`,
    newProduct
  );
  return response.data;
};

const updateProduct = async ({
  id,
  updatedProduct,
}: {
  id: number;
  updatedProduct: NewProductEntry;
}) => {
  const response = await axios.put<Product>(
    `${apiBaseUrl}/products/${id}`,
    updatedProduct
  );
  return response.data;
};

const deleteProduct = async (id: number) => {
  const response = await axios.delete<Product>(`${apiBaseUrl}/products/${id}`);
  return response.data;
};

const productService = {
  getAll,
  addProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
