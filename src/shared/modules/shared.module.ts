import { PopUpComponent } from './../components/pop-up/pop-up.component';
import { ProductComponent } from './../components/product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    ProductComponent,
    PopUpComponent
  ],
  imports: [
    CommonModule, 
    
  ],
  exports: [
    ProductComponent,
    PopUpComponent
  ]
})
export class SharedModule {}
