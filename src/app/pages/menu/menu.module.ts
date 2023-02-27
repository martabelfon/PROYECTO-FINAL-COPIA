import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuProductComponent } from 'src/shared/components/menu-product/menu-product.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenuRoutingModule,
  ]
})
export class MenuModule { }
