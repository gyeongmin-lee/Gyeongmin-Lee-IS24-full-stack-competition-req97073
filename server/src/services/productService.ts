import products from "../../data/products";
import { NewProductEntry, Product } from "../types";
import { getNewProductId } from "../utils";

const getEntries = (): Product[] => {
  return products;
};

const addEntry = (entry: NewProductEntry) => {
  const newProductEntry = {
    productId: getNewProductId(),
    ...entry,
  };

  products.push(newProductEntry);
  return newProductEntry;
};

export default {
  getEntries,
  addEntry,
};
