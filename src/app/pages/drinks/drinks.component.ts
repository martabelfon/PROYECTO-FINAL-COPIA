import { IProduct } from './../../interface/iproduct';
import { RequestService } from './../../../shared/api/request.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})
export class DrinksComponent implements OnInit {

  public productsList!: IProduct[];
  public drinksList: IProduct[] = [];
  public filterDrinks: IProduct[] = [];

  mostrar: boolean = true;
  tipos: any = [];

  constructor(private api: RequestService) {
    // this.api.emitProduct.subscribe((products: any) => {
    //   for (const product of products) {
    //     if (
    //       product.tipo === 'Cerveza' ||
    //       product.tipo === 'Cafe' ||
    //       product.tipo === 'Vinotinto' ||
    //       product.tipo === 'Bebida' ||
    //       product.tipo === 'Vinoblanco' ||
    //       product.tipo === 'Vinorosado' ||
    //       product.tipo === 'Cava' ||
    //       product.tipo === 'Vinoblanco'
    //     ) {
    //       this.drinksList.push(product);
    //     }
    //   }
    //   console.log(this.drinksList);
      
    //   this.tipos = Array.from(new Set(this.drinksList.map((product) => product.tipo)));
    //   this.toggle();

    // });

  }

  ngOnInit(): void {
    this.api.emitProduct.subscribe((products: any) => {
    this.productsList = products;
    for (const product of products) {
          if (
            product.tipo === 'Cerveza' ||
            product.tipo === 'Cafe' ||
            product.tipo === 'Vinotinto' ||
            product.tipo === 'Bebida' ||
            product.tipo === 'Vinoblanco' ||
            product.tipo === 'Vinorosado' ||
            product.tipo === 'Cava' ||
            product.tipo === 'Vinoblanco'
          ) {
            this.drinksList.push(product);
            this.filterDrinks.push(product)
          }
        }
        this.tipos = Array.from(new Set(this.drinksList.map((product) => product.tipo)));
    
    // console.log(this.tipos)
    });
    }


    // this.productsList = this.api.productList; 
    // // this.tipos = [...new Set(this.drinksList.map((product) => product.tipo))];
    // console.log(this.tipos)
    // console.log(this.drinksList)
  


  toggle(tipo:String = '') {
      // console.log('tipo', tipo);
      // console.log('drinksList', this.drinksList)
      if (tipo) {
        this.filterDrinks = this.drinksList.filter(
          (product) => product.tipo === tipo);
      } else {
        this.filterDrinks = this.drinksList;
      }
      // console.log('filterDrinks', this.filterDrinks)
    }
  
  }
