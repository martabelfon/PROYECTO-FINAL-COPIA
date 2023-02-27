import { UsersService } from './../../users/users.service';
import { Router } from '@angular/router';
import { RequestService } from './../../api/request.service';
import { IUser } from './../../../app/interface/iuser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  implements OnInit{

  userForm!: FormGroup;
  registerUser!: IUser;
  userList!: any;
  email: string = "";
  password: string = "";
  error!: String;
  

  submited: boolean = false;

  constructor(
    private form: FormBuilder,
    private api: RequestService,
    private route: Router,
    private user: UsersService
  ) {}
  

  ngOnInit(): void {
    //Add User form validations
    this.userForm = this.form.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
      });
    
    this.userForm.valueChanges.subscribe((data) => {
      this.registerUser = data;
    });


    
  }

  getUsers(){
    this.user.getAllUsers().subscribe((data)=>{
      this.userList = data;
      // console.log(this.userList);
    })
  }

  login(){
    const userData = {email: this.email, password: this.password};
    this.user.postLogin(userData).subscribe(
      (data:any) => {
        this.user.setToken(data.token);
        localStorage.setItem("token", data.token); 
        localStorage.setItem("user", JSON.stringify(data.userDB)); 
        this.user.getUserLogged();
        this.user.userLogged = userData; 
        this.route.navigate(['/products']);
        // console.log(data);
    },
      (error:any) => {
        this.error = error.error;
        // console.log(error);
      });
  }
}
