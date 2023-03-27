import products from "../data/products";

let newProductId = Math.max(...products.map((p) => p.productId)) + 1;

export const getNewProductId = (): number => {
  return newProductId++;
};
