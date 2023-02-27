import { RequestService } from './../../api/request.service';
import { UsersService } from './../../users/users.service';
import { IProduct } from './../../../app/interface/iproduct';
import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  @Input() public product!: any;

  popupOpen = false;
  token!: any;
  carrito: any = [];

  constructor(private user: UsersService, private api: RequestService) {}

  openPopup(){
    this.popupOpen = true;
  }

  closePopup(){
    this.popupOpen = false;
  }

  addIndividualOrder(product:any){
    
    if (localStorage.getItem('carrito')) {
      this.carrito = JSON.parse(localStorage.getItem("carrito")!);
      this.carrito.push(product);
      // console.log(this.carrito);
      localStorage.setItem("carrito", JSON.stringify(this.carrito));

    } else {
      this.carrito.push(product);
      // console.log(this.carrito);
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    }
    this.api.emitShoppingCart();
    
  }

  ngOnInit(): void {

    this.token = localStorage.getItem("token")

    this.user.checksession(this.token).subscribe((data:any)=>{});

  }
}