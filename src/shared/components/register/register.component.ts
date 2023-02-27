import { UsersService } from './../../users/users.service';
import { Router } from '@angular/router';
import { RequestService } from './../../api/request.service';
import { IUser } from './../../../app/interface/iuser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  userForm!: FormGroup;
  registerUser!: IUser;
  userList!: any;
  userToShow!: String;
  token!: any;

  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  error!: any;

  submited: boolean = false;

  constructor(
    private form: FormBuilder,
    private api: RequestService,
    private route: Router,
    private user: UsersService
  ) {

    this.user.emitUser.subscribe((data:any)=>{
      const dataParsed = JSON.parse(data);
      this.userToShow = dataParsed.email;
    })

  }
  

  ngOnInit(): void {
    //Add User form validations
    this.userForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    
    this.userForm.valueChanges.subscribe((data) => {
      this.registerUser = data;
    });

    this.token = localStorage.getItem("token");

    this.user.checksession(this.token).subscribe((data:any)=>{
      this.userToShow = data.email;
    });
  }

  getUsers(){
    this.user.getAllUsers().subscribe((data)=>{
      this.userList = data;
      // console.log(this.userList);
    })
  }

  register(){
    const userData = {email: this.email, password: this.password};
    if (this.password !== this.confirmPassword){
      this.error = "Las contraseñas no coinciden";
      return
    } else {
      this.user.postRegister(userData).subscribe(
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

}

