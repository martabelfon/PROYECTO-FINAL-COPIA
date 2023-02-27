import { SharedModule } from './../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrinksRoutingModule } from './drinks-routing.module';



@NgModule({
  declarations: [
  ],
  
  imports: [
    CommonModule,
    DrinksRoutingModule,
    SharedModule
  ]
})
export class DrinksModule { }
