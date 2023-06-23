import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from '../product/product.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"",component:LandingComponent , children:[
    {path:"dashboard",component:DashboardComponent},
    {path:"products",component:ProductsComponent},
    {path:"add-products",component:AddProductsComponent},
    {path:"orders",component:OrdersComponent},
    {path:"add-products/:id",component:AddProductsComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

