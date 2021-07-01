import { Component, OnInit } from '@angular/core';
import { GroceryListInterface } from '../grocery-list/shared/grocery-list.interface';
import { GroceryListService } from '../grocery-list/shared/grocery-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GroceryListDeleteComponent } from '../grocery-list/delete/grocery-list-delete.component';
import { ProductListService } from '../product/shared/product-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  groceryList: GroceryListInterface;
  groceryLists: GroceryListInterface[];
  groceryListForm: FormGroup;

  constructor(private groceryListService: GroceryListService, private productService: ProductListService, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.groceryListForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.groceryList = {id: this.groceryListService.getNextGroceryListsId(), name: ''};

    if (this.groceryListService.isThereGroceryList()) {
      this.groceryLists = this.groceryListService.getAllGroceryLists();
    } else {
      this.groceryLists = this.groceryListService.initDefaultGroceryLists();
    }

    if (!this.productService.isThereProductsList()) {
      this.productService.initDefaultProducts();
    }
  }

  ngOnInit(): void {
  }

  addGroceryList(formData: object): any {
    if (this.groceryListForm.valid) {
      Object.assign(this.groceryList, formData);
      const addedGroceryList = this.groceryListService.addGroceryList(this.groceryList);
      this.groceryLists = this.groceryListService.getAllGroceryLists();
      this.groceryListForm.reset();
      this.groceryList = {id: this.groceryListService.getNextGroceryListsId(), name: ''};
      return addedGroceryList;
    }
  }

  deleteGroceryList(id: number): void {
    const dialogRef = this.dialog.open(GroceryListDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groceryLists = this.groceryLists.filter(groceryList => groceryList.id !== id);
        this.groceryListService.deleteGroceryList(id);
        this.groceryLists = this.groceryListService.getAllGroceryLists();
      }
    });
  }

}
