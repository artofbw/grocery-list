import { Injectable } from '@angular/core';
import { GroceryListInterface } from './grocery-list.interface';
import { ProductInterface } from '../../product/shared/product.interface';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private storageGroceryListsPrefix: string;
  private storageGroceryListProductsPrefix: string;

  constructor() {
    this.storageGroceryListsPrefix = 'grocery-lists';
    this.storageGroceryListProductsPrefix = 'grocery-lists-products-';
  }

  initDefaultGroceryLists(): GroceryListInterface[] {
    const firstGroceryList: GroceryListInterface = {
      id: 1,
      name: 'Moja testowa lista zakupów',
    };
    const secondGroceryList: GroceryListInterface = {
      id: 2,
      name: 'Kolejna lista zakupów',
    };

    const groceryLists = [firstGroceryList, secondGroceryList];

    localStorage.setItem(this.storageGroceryListsPrefix, JSON.stringify(groceryLists));
    return groceryLists;
  }

  getAllGroceryLists(): GroceryListInterface[] {
    return JSON.parse(localStorage.getItem(this.storageGroceryListsPrefix) || '[]');
  }

  isThereGroceryList(): boolean {
    if (!this.getAllGroceryLists().length) {
      return false;
    }
    return true;
  }

  getNextGroceryListsId(): number {
    let max = 1;
    const groceryLists = this.getAllGroceryLists();
    groceryLists.forEach(groceryList => {
      if (groceryList.id > max) {
        max = groceryList.id;
      }
    });
    return max;
  }

  reorderGroceryLists(): void {
    let idNumber = 0;
    const groceryLists = this.getAllGroceryLists();
    groceryLists.forEach(groceryList => groceryList.id = idNumber += 1);
    localStorage.setItem(this.storageGroceryListsPrefix, JSON.stringify(groceryLists));
  }

  addGroceryList(groceryList: GroceryListInterface): GroceryListInterface {
    const groceryLists = this.getAllGroceryLists();
    groceryLists.push(groceryList);
    localStorage.setItem(this.storageGroceryListsPrefix, JSON.stringify(groceryLists));
    this.reorderGroceryLists();
    return groceryList;
  }

  deleteGroceryList(id: number): void {
    let groceryLists = this.getAllGroceryLists().sort((a, b) => a.id - b.id);
    localStorage.removeItem(this.storageGroceryListsPrefix + id);
    groceryLists = groceryLists.filter(groceryList => groceryList.id !== id);
    localStorage.setItem(this.storageGroceryListsPrefix, JSON.stringify(groceryLists));
    this.reorderGroceryLists();
  }

  getGroceryListById(id: string): any {
    const groceryLists = this.getAllGroceryLists().sort((a, b) => a.id - b.id);
    return groceryLists.filter(gl => gl.id === parseInt(id))[0];
  }

  reorderProductsInGroceryList(groceryList: GroceryListInterface): void {
    let idNumber = 0;
    const products = this.getProductsByGroceryList(groceryList);
    products.forEach(product => product.id = idNumber += 1);
    localStorage.setItem(this.storageGroceryListProductsPrefix + groceryList.id, JSON.stringify(products));
  }

  getProductsByGroceryList(groceryList: GroceryListInterface): any[] {
    return JSON.parse(localStorage.getItem(this.storageGroceryListProductsPrefix + groceryList.id) || '[]');
  }

  checkIfProductExistsInProducts(product: any, products: any[]): number {
    return products.findIndex(pr => pr.name === product.name);
  }

  addProductToGroceryList(product: any, groceryList: GroceryListInterface): ProductInterface {
    const products = this.getProductsByGroceryList(groceryList);

    if (this.checkIfProductExistsInProducts(product, products) !== -1) {
      products.forEach((pr) => {
        if (pr.name === product.name) {
          pr.amount += 1;
        }
      });
      localStorage.setItem(this.storageGroceryListProductsPrefix + groceryList.id, JSON.stringify(products));
    } else {
      product.amount = 1;
      products.push(product);
      localStorage.setItem(this.storageGroceryListProductsPrefix + groceryList.id, JSON.stringify(products));
    }
    this.reorderProductsInGroceryList(groceryList);
    return product;
  }

  deleteProductFromGroceryList(groceryList: GroceryListInterface, product: any): void {
    let products = this.getProductsByGroceryList(groceryList);
    products = products.filter(pr => pr.id !== product.id);
    localStorage.setItem(this.storageGroceryListProductsPrefix + groceryList.id, JSON.stringify(products));
  }
}
