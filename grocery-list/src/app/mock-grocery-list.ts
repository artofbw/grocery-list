import { GroceryListInterface } from './interfaces/grocery-list.interface';

export const GROCERY_LIST: GroceryListInterface[] = [
  {
    id: 1,
    name: 'Zakupy na dzisiaj',
    products: [
      {id: 1, name: 'pomidor', price: 1.23, number: 1},
      {id: 2, name: 'ziemniaki', price: 1.23, number: 2},
    ]
  }
];
