import { IProduct } from './../../interface/iproduct';
import { RequestService } from './../../../shared/api/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deserts',
  templateUrl: './deserts.component.html',
  styleUrls: ['./deserts.component.scss']
})
export class DesertsComponent implements OnInit{

  public productsList! :IProduct[];
  public filteredObjects!: IProduct[];


  constructor(private api : RequestService){
    this.api.emitProduct.subscribe((data:any)=>{
      this.productsList =data;
      // console.log(data);
      this.filteredObjects = this.productsList.filter(
        (productsList)=>{
        return productsList.tipo.toString() === 'Postre';
      });
      
    })
   
   
  }

  ngOnInit(): void {
    this.productsList= this.api.productList;
    // console.log(this.productsList);
   
    this.filteredObjects = this.productsList.filter(
      (productsList)=>{
      return productsList.tipo.toString() === 'Postre';
    });


  }

}
