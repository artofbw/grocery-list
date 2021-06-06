import { GroceryListProductInterface } from './grocery-list-product.interface';

export interface GroceryListInterface {
  id: number;
  name: string;
  products?: GroceryListProductInterface[];
}
