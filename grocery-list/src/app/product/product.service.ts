import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { ProductInterface } from '../interfaces/product.interface';
import { PRODUCTS } from '../mock-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<ProductInterface[]> {
    return of(PRODUCTS);
  }
}
