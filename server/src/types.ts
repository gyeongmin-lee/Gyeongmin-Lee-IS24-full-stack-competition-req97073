export enum Methodology {
  AGILE = "agile",
  WATERFALL = "waterfall",
}
export interface Product {
  productId: string;
  productName: string;
  productOwnerName: string;
  Developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: Methodology;
}
