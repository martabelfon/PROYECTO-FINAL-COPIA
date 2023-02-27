import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { IProduct } from 'src/app/interface/iproduct';
import { RequestService } from 'src/shared/api/request.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  public productsList!: IProduct[];
  platosMenu!: any;
  menu!: any;
  tipos: any [] = [];
  opcionSeleccionado: string  = '';
  opcionSeleccionado2: string  = '';


  constructor(private api: RequestService) {
    this.api.emitProduct.subscribe((res: any) => {
      this.productsList = res;
      for (const product of this.productsList){
        if (!this.tipos.includes(product.tipo)) {
          this.tipos.push(product.tipo);
        }
      }
      // console.log(this.tipos)
    })
  }

  // capturar(){
  //   this.opcionSeleccionado;
  // }



  ngOnInit(): void {
    this.productsList = this.api.productList;

  }
  // editProduct(product:any, id:string) {
  //   return this.http.patch(this.url +'products/'+id, product);
  // }
} 