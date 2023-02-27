import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule } from './server-routing.module';
import { ServerComponent } from './server.component';


@NgModule({
  declarations: [
    ServerComponent
  ],
  imports: [
    CommonModule,
    ServerRoutingModule
  ]
})
export class ServerModule { }
