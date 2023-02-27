import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url:string = 'https://final-project-back.vercel.app/users/';

  // Auth para el JWT
  public myHeaders:any = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    })
  }

  public emitUser: any = new EventEmitter<any>();
  userLogged!:any;

  constructor(private http: HttpClient, private cookies: CookieService) { }

  getAllUsers(){
    return this.http.get(this.url);
  }

  postLogin(user:any){
    return this.http.post(this.url + "login/", user);
  }

  postRegister(user:any){
    return this.http.post(this.url, user, this.myHeaders);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  deteteToken(){
    this.cookies.delete("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getUser(){
    return this.userLogged;
  }

  getUserLogged(){
    this.emitUser.emit(localStorage.getItem("user"));
    return localStorage.getItem("user");
  }

  checksession(token:any){
    return this.http.post(this.url + "checksession", token, this.myHeaders);
  }

}
