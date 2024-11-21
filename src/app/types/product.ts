// MinistryPrice型
export type MinistryPrice = {
    name: string;
    price: number;
  };
  
  // Product型
  export type Product = {
    id: number;
    name: string;
    price: number;
    ministryPrice?: {
        id: number;
        name: string;
        price: number;
    }; // MinistryPrice情報がオプション
  };
  
  // CheaperProduct型（そのまま拡張してもよい）
  export type CheaperProduct = Product & {
    isCheaper: boolean;
  };