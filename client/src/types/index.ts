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

export type NewProductEntry = Omit<Product, "productId">;
