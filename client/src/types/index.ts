export enum Methodology {
  AGILE = "agile",
  WATERFALL = "waterfall",
}
export interface Product {
  productId: number;
  productName: string;
  productOwnerName: string;
  Developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: Methodology;
}

export enum Filter {
  ScrumMaster = "scrumMaster",
  Developer = "developer",
}

export type NewProductEntry = Omit<Product, "productId">;
