import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../delete/product-delete.component';
import { ProductInterface } from '../shared/product.interface';
import { ProductListService } from '../shared/product-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productForm: FormGroup;
  product: ProductInterface;
  products: ProductInterface[] = [];
  selectedProduct?: ProductInterface | null;
  displayedColumns: string[] = ['name', 'price', 'actions'];

  constructor(private productService: ProductListService, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
    });
    this.product = {id: this.productService.getNextProductId(), name: '', price: 0};

    if (this.productService.isThereProductsList()) {
      this.products = this.productService.getProducts();
    } else {
      this.products = this.productService.initDefaultProducts();
    }
  }

  ngOnInit(): void {}

  onSelect(product: ProductInterface): void {
    this.selectedProduct = product;
  }

  exitEditModel(): void {
    this.selectedProduct = null;
  }

  addProduct(formData: object): any {
    if (this.productForm.valid) {
      Object.assign(this.product, formData);
      const addedProduct = this.productService.addProduct(this.product);
      this.products = this.productService.getProducts();
      this.productForm.reset();
      this.product = {id: this.productService.getNextProductId(), name: '', price: 0};
      return addedProduct;
    }
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.products = this.products.filter(product => product.id !== id);
        this.productService.deleteProduct(id);
        this.products = this.productService.getProducts();
      }
    });
  }

}
