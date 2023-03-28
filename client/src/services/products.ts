import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Product } from "../types";

const getAll = async () => {
  const response = await axios.get<Product[]>(`${apiBaseUrl}/products`);
  return response.data;
};

export default { getAll };
