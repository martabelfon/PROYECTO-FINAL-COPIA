import { Router } from '@angular/router';
import { UsersService } from './../../users/users.service';
import { RequestService } from './../../api/request.service';
import { IProduct } from './../../../app/interface/iproduct';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  isActive: boolean = false;
  token!: any;
  carrito!: any;
  userToShow!: String;

  constructor(private user: UsersService, private route: Router){

    this.user.emitUser.subscribe((data:any)=>{
      const dataParsed = JSON.parse(data);
      this.userToShow = dataParsed.email;
    })
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  toggleSidebar2() {
    document.getElementById("checkbox")?.click();
  }
  

  logout(){
    this.user.deteteToken();
    location.reload();
    this.route.navigate(['/']);
  }

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.carrito = localStorage.getItem("carrito");

    this.user.checksession(this.token).subscribe((data:any)=>{
      this.userToShow = data.email;
    })

    
  }
}
