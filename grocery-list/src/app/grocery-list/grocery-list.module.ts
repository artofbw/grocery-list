import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { GroceryListComponent } from './list/grocery-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroceryListDeleteComponent } from './delete/grocery-list-delete.component';
import { MaterialModule } from '../material/material.module';
import { GroceryListDetailsComponent } from './details/grocery-list-details.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    GroceryListComponent,
    GroceryListDeleteComponent,
    GroceryListDetailsComponent,
  ],
  exports: [
    GroceryListComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    DragDropModule,
  ]
})
export class GroceryListModule { }
