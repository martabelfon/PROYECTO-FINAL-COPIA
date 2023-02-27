import { ShareService } from './../../../shared/share/share.service';
import { EventEmitter } from '@angular/core';
import { IProduct } from './../../interface/iproduct';
import { RequestService } from './../../../shared/api/request.service';
import { Component, OnInit, Input } from '@angular/core';
import { filter } from 'rxjs';
// import { PopUpComponent } from 'src/shared/components/pop-up/pop-up.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productsList: IProduct[] = [];
  public filterProducts: IProduct[] = [];
  // public cartaProducts !: IProduct[];

  mostrar:boolean = true;
  tipos: any = [];

  constructor(private api: RequestService) {


  }

  ngOnInit(): void {

    this.api.emitProduct.subscribe((data:any)=>{

      this.filterProducts = [];

      for (const filterCarta of data) {
        if (filterCarta.carta === true) {
          this.productsList.push(filterCarta);
          this.filterProducts.push(filterCarta);
        }
      }
console.log(this.filterProducts);

      for (const product of this.productsList) {
        if (!this.tipos.includes(product.tipo)) {
          this.tipos.push(product.tipo);
          // console.log("TIPOS:", this.tipos);
        } 
      }
    })


    // console.log(this.api.productList);

    // this.productsList = this.api.productList; 
    // this.filterProducts = this.api.productList;

    for (const filterCarta of this.api.productList) {
      if (filterCarta.carta === true) {
        this.productsList.push(filterCarta);
      }
    }


  }

  toggle(tipo:String = ''){
    // console.log(tipo);
    if (tipo) {
      this.filterProducts = this.productsList.filter(
        (product) => product.tipo === tipo); 
    } else {
      this.filterProducts = this.productsList
    }

  }
}
