import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ProductListComponent } from './list/product-list.component';
import { ProductDeleteComponent } from './delete/product-delete.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDeleteComponent,
  ],
  exports: [
    ProductListComponent,
    ProductDeleteComponent,
  ],
  imports: [
    RouterModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class ProductModule { }
