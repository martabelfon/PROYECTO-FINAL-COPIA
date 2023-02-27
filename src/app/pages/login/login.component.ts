import { UsersService } from './../../../shared/users/users.service';
import { IUser } from './../../interface/iuser';
import { Router } from '@angular/router';
import { RequestService } from './../../../shared/api/request.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login: boolean = true;
  public register: boolean = false;


  userToShow!: String;
  token!: any;

  constructor(private user:UsersService) {
    this.user.emitUser.subscribe((data:any)=>{
      const dataParsed = JSON.parse(data);
      this.userToShow = dataParsed.email;
    })
  }

  swap(){
    if (this.login) {
      this.login = !this.login;
      this.register = !this.register;
    } else {
      this.login = !this.login;
      this.register = !this.register;
    }
  }


  ngOnInit(): void {
    this.token = localStorage.getItem("token");

    this.user.checksession(this.token).subscribe((data:any)=>{
      this.userToShow = data.email;
    });
  }

}
