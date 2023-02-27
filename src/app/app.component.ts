import { UsersService } from './../shared/users/users.service';
import { RequestService } from './../shared/api/request.service';
import { IProduct } from './interface/iproduct';
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FINAL-PROJECT-FRONT';
  token!: any;
  

  constructor(private router: Router, private api: RequestService, private user: UsersService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        window.scrollTo(0,0)
      }
    });

    this.api.getProducts().subscribe((data:any)=>{
      this.api.productList = data;
      this.api.emitData();
      // console.log(data)
    })
    
    this.token = localStorage.getItem("token")

    this.user.checksession(this.token).subscribe((data:any)=>{
      // console.log(data);
    })
    
  }

}
