import { IProduct } from './../../app/interface/iproduct';
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class RequestService {



  url:string = 'https://final-project-back.vercel.app/';
  // url:string = 'http://localhost:3000/';


  // Auth para el JWT
  public myHeaders:any = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    })
  }

  public productList!: any;


  public emitProduct: any = new EventEmitter<any>();
  public emitCarrito: any = new EventEmitter<any|null>();

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.url +'products/');
  }

  getProductsById(id:string) {
    return this.http.get(this.url +'products/'+id);
  }

  postProduct(product:IProduct) {
    return this.http.post(this.url +'products/', product);
  }

  deleteProduct(id:string) {
    return this.http.delete(this.url +'products/'+id);
  }

  editProduct(product:any, id:string) {
    return this.http.patch(this.url +'products/'+id, product);
  }

  emitData(){
    // console.log(this.productList)
    this.emitProduct.emit(this.productList);
  }

  emitShoppingCart(){
    this.emitCarrito.emit(JSON.parse(localStorage.getItem("carrito")!));
  }

  getProductByMenu(){
    // console.log(this.url);
    
    return this.http.get(this.url + 'menu/')
  }
  postMenu(menu:any){
    return this.http.post(this.url + 'menu/', menu)
  }

  getOrders(){
    return this.http.get(this.url + 'order/', this.myHeaders);
  }

  getOrderById(id:any){
    return this.http.get(this.url + 'order/' + id , this.myHeaders);
  }

  deleteMenu (id:any) {
    return this.http.delete(this.url + 'menu/delete/' , id);
  }

  editOrderById(id:string, product:any){
    return this.http.put(this.url + 'order/'+ id, product, this.myHeaders);
  }

  postIndividualOrder(order:any){
    return this.http.post(this.url + 'individual-order/', order);
  }

  postOrder(order:any){
    return this.http.post(this.url + 'order/', order, this.myHeaders);
  }

  editIndividualOrderById(id:string, product:any){
    return this.http.put(this.url + 'individual-order/'+ id, product);
  }

}

