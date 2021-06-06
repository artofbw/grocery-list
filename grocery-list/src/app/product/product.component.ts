import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ProductInterface } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: ProductInterface[] = [];
  selectedProduct?: ProductInterface;
  displayedColumns: string[] = ['name', 'price', 'actions'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  onSelect(product: ProductInterface): void {
    this.selectedProduct = product;
  }

}
