import { RegisterComponent } from '../../../shared/components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from '../../../shared/components/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from '../login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule    
  ]
})
export class LoginModule { }
