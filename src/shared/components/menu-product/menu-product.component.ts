import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IProduct } from 'src/app/interface/iproduct';

@Component({
  selector: 'app-menu-product',
  templateUrl: './menu-product.component.html',
  styleUrls: ['./menu-product.component.scss']
})
export class MenuProductComponent implements OnInit{
public checked: boolean = false;
@Input() product!: any;
@Input() plato!: any;
@Output() emit = new EventEmitter<any>();


constructor(){}

ngOnInit(): void {
  // console.log(this.product);
 
}


onCheckboxChange(product:any){
  
  this.checked = !this.checked;

  const producto = {product:product, plato:this.plato, checked:this.checked}
  
  this.emit.emit(producto);
}
}
