import { SharedModule } from './../shared/modules/shared.module';
import { ShoppingCartComponent } from './../shared/components/shopping-cart/shopping-cart.component';
import { RequestService } from './../shared/api/request.service';
import { NavigatorComponent } from './../shared/components/navigator/navigator.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';
import { DesertsComponent } from './pages/deserts/deserts.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuProductComponent } from 'src/shared/components/menu-product/menu-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    ProductsDetailComponent,
    DesertsComponent,
    AddProductComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuProductComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    RequestService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
