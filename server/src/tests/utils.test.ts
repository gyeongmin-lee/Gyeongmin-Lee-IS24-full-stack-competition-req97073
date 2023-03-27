import products from "../../data/products";
import { getNewProductId } from "../utils";

describe("getNewProductId", () => {
  test("the new ID is one higher than the highest ID", () => {
    const maxProductID = Math.max(...products.map((p) => p.productId));
    console.log("maxProductID", maxProductID);

    const newID1 = getNewProductId();
    expect(newID1).toBe(maxProductID + 1);

    const newID2 = getNewProductId();
    expect(newID2).toBe(newID1 + 1);
  });
});
