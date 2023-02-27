import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)},
  {path: 'deserts', loadChildren: () => import('./pages/deserts/deserts.module').then((m) => m.DesertsModule)},
  {path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then((m) => m.MenuModule)},
  {path: 'drinks', loadChildren: () => import('./pages/drinks/drinks.module').then((m) => m.DrinksModule)},
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule)},
  {path: 'products', loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule)},
  {path: 'products/:id', loadChildren: () => import('./pages/products-detail/products-detail.module').then((m) => m.ProductsDetailModule)},
  {path: 'add', loadChildren: () => import('./pages/add-product/add-product.module').then((m) => m.AddProductModule)},
  {path: 'edit', loadChildren: () => import('./pages/edit-product/edit-product.module').then((m) => m.EditProductModule)},
  {path: 'kitchen', loadChildren: () => import('./pages/kitchen/kitchen.module').then((m) => m.KitchenModule)},
  {path: 'bar', loadChildren: () => import('./pages/bar/bar.module').then((m) => m.BarModule)},
  {path: 'server', loadChildren: () => import('./pages/server/server.module').then((m) => m.ServerModule)},
  {path: 'orders', loadChildren: () => import('./pages/orders/orders.module').then((m) => m.OrdersModule)},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
