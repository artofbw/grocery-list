import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../product/shared/product.interface';
import { ProductListService } from '../../product/shared/product-list.service';
import { GroceryListService } from '../shared/grocery-list.service';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-grocery-list-details',
  templateUrl: './grocery-list-details.component.html',
  styleUrls: ['./grocery-list-details.component.css']
})
export class GroceryListDetailsComponent implements OnInit {
  products: ProductInterface[];
  groceryListProducts: any[];
  totalPrice: string;

  constructor(
    private productListService: ProductListService,
    private groceryListService: GroceryListService,
    private activatedRoute: ActivatedRoute,
    ) {
    this.products = this.productListService.getProducts();
    this.groceryListProducts = [];
    this.totalPrice = this.getTotalPriceForGroceryList();

    this.activatedRoute.params.subscribe((params: any) => {
      const id = params.id;
      const groceryList = this.groceryListService.getGroceryListById(id);
      this.groceryListProducts = this.groceryListService.getProductsByGroceryList(groceryList);
    });
  }

  ngOnInit(): void {
  }

  addProductToGroceryList(product: ProductInterface): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params.id;
      if (id) {
        const groceryList = this.groceryListService.getGroceryListById(id);
        this.groceryListService.addProductToGroceryList(product, groceryList);
      }
      this.totalPrice = this.getTotalPriceForGroceryList();
      const newGroceryList = this.groceryListService.getGroceryListById(id);
      this.groceryListProducts = this.groceryListService.getProductsByGroceryList(newGroceryList);
    });
  }

  getTotalPriceForGroceryList(): string {
    let totalPrice = 0;
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params.id;
      const groceryList = this.groceryListService.getGroceryListById(id);
      const groceryListProducts = this.groceryListService.getProductsByGroceryList(groceryList);

      groceryListProducts.forEach((product) => {
        if (product.amount) {
          totalPrice += product.amount * product.price;
        } else {
          totalPrice += product.price;
        }
      });
    });
    return totalPrice.toFixed(2);
  }

  deleteProductFromGroceryList(product: any): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params.id;
      const groceryList = this.groceryListService.getGroceryListById(id);
      this.groceryListService.deleteProductFromGroceryList(groceryList, product);
      this.groceryListProducts = this.groceryListService.getProductsByGroceryList(groceryList);
    });
    this.totalPrice = this.getTotalPriceForGroceryList();
  }

  drop(event: CdkDragDrop<{product: any}[]>): void {
    moveItemInArray(this.groceryListProducts, event.previousIndex, event.currentIndex);
  }
}
