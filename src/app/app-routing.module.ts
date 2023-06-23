import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { AboutComponent } from './Component/about/about.component';
import { ProductsComponent } from './Component/products/products.component';
import { ContactComponent } from './Component/contact/contact.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { LoginComponent } from './Component/login/login.component';
import { CartComponent } from './Component/cart/cart.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { AdminGuard } from './admin.guard';



const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactComponent},
  {path:"products",component:ProductsComponent},
  {path:"product-details/:id",component:ProductDetailsComponent},
  {path:"login", component:LoginComponent},
  {path:"cart", component:CartComponent},
  {path:"products/:category", component:ProductsComponent},
  { path:"checkout",component:CheckoutComponent},
  {path:"admin", canActivate:[AdminGuard], loadChildren:()=> import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:"**",redirectTo:"/"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
