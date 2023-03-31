import products from "../../data/products";
import { NewProductEntry, Product } from "../types";
import { getNewProductId } from "../utils";

const getEntries = (): Product[] => {
  return products;
};

const getOneEntry = (id: number): Product | undefined => {
  return products.find((product) => product.productId === id);
};

const addEntry = (entry: NewProductEntry) => {
  const newProductEntry = {
    productId: getNewProductId(),
    ...entry,
  };

  products.push(newProductEntry);
  return newProductEntry;
};

const updateEntry = (id: number, entry: NewProductEntry) => {
  const product = products.find((product) => product.productId === id);

  if (product) {
    product.productName = entry.productName;
    product.productOwnerName = entry.productOwnerName;
    product.Developers = entry.Developers;
    product.scrumMasterName = entry.scrumMasterName;
    product.startDate = entry.startDate;
    product.methodology = entry.methodology;
  }

  return product;
};

const deleteEntry = (id: number) => {
  const product = products.find((product) => product.productId === id);

  if (product) {
    products.splice(products.indexOf(product), 1);
  }

  return product;
};

export default {
  getEntries,
  addEntry,
  updateEntry,
  getOneEntry,
  deleteEntry,
};
