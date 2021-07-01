import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/list/product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroceryListDetailsComponent } from './grocery-list/details/grocery-list-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'product', component: ProductListComponent},
  { path: 'grocery-list-detail/:id', component: GroceryListDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
