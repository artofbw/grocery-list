import { Injectable } from '@angular/core';
import { ProductInterface } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  public storageProductPrefix: string;

  constructor() {
    this.storageProductPrefix = 'products';
  }

  initDefaultProducts(): ProductInterface[] {
    const firstProduct: ProductInterface = {id: 1, name: 'ziemniaki', price: 1.23};
    const secondProduct: ProductInterface = {id: 2, name: 'buraki', price: 3.21};
    const thirdProduct: ProductInterface = {id: 3, name: 'szynka', price: 15};

    const productsList = [firstProduct, secondProduct, thirdProduct];

    localStorage.setItem(this.storageProductPrefix, JSON.stringify(productsList));
    return productsList;
  }

  reorderProducts(): void {
    let idNumber = 0;
    const products = this.getProducts();
    products.forEach(product => product.id = idNumber += 1);
    localStorage.setItem(this.storageProductPrefix, JSON.stringify(products));
  }

  isThereProductsList(): boolean {
    if (!this.getProducts().length) {
      return false;
    }
    return true;
  }

  getProducts(): ProductInterface[] {
    return JSON.parse(localStorage.getItem(this.storageProductPrefix) || '[]');
  }

  getNextProductId(): number {
    let max = 1;
    const productsList = this.getProducts();
    productsList.forEach(product => {
      if (product.id > max) {
        max = product.id;
      }
    });
    return max;
  }

  addProduct(product: ProductInterface): ProductInterface {
    const products = this.getProducts();
    products.push(product);
    localStorage.setItem(this.storageProductPrefix, JSON.stringify(products));
    this.reorderProducts();
    return product;
  }

  deleteProduct(productId: number): void {
    let productsList = this.getProducts().sort((a, b) => a.id - b.id);
    localStorage.removeItem(this.storageProductPrefix + productId);
    productsList = productsList.filter(pr => pr.id !== productId);
    localStorage.setItem(this.storageProductPrefix, JSON.stringify(productsList));
    this.reorderProducts();
  }

}
