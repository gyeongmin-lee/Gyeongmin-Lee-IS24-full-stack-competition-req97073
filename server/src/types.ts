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
  SCRUM_MASTER = "scrumMaster",
  DEVELOPER = "developer",
}

export interface ProductQueryParams {
  type?: Filter;
  query?: string;
}

export type NewProductEntry = Omit<Product, "productId">;
