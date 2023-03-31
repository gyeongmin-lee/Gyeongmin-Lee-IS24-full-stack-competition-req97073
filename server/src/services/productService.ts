import products from "../../data/products";
import { Filter, NewProductEntry, Product, ProductQueryParams } from "../types";
import { getNewProductId } from "../utils";

const getEntries = ({ type, query }: ProductQueryParams): Product[] => {
  if (!query || !type) {
    return products;
  }

  if (type === Filter.SCRUM_MASTER) {
    return products.filter((product) =>
      product.scrumMasterName
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())
    );
  } else if (type === Filter.DEVELOPER) {
    return products.filter((product) =>
      product.Developers.some((developer) =>
        developer.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    );
  }

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
