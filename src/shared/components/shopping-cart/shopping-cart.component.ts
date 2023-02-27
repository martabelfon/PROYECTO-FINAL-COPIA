import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/shared/api/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{

  shoppingCart! : any;
  globalPrice : number = 0;
  isActive: boolean = false;
  carrito!: any;
  token!: any;
  idArrayShopping: any [] = [];

  individualOrderForm!: FormGroup;
  individualDataForm!: any;
  submited:boolean = false;

  constructor(private api: RequestService, private form: FormBuilder, private route: Router) {}
  
  toggleShoppingCart(){
    this.isActive = !this.isActive;
  
  }

  ngOnInit(): void {
    this.globalPrice = 0;
    this.token = localStorage.getItem("token");
    // console.log('Token:', this.token);
    this.carrito = localStorage.getItem("carrito");
    this.api.emitCarrito.subscribe((data:any)=>{
      this.shoppingCart = data;
      this.carrito = data;
      this.globalPrice = 0;
      for (const item of this.shoppingCart) {
        this.globalPrice += item.precio;
      }
    })


    this.shoppingCart = JSON.parse(localStorage.getItem('carrito')!);
    // console.log(this.shoppingCart);

    for (const item of this.shoppingCart) {
      this.globalPrice += item.precio;
    }

    // FORMULARIO INDIVIDUAL ORDER
    this.individualOrderForm = this.form.group({
      product: ['', [Validators.required, Validators.minLength(10)]],
      status: false,
      type: [''],
      table: ['', [Validators.required, Validators.minLength(1)]],
      menu: false,
      comment: [''],
    });

    this.individualOrderForm.valueChanges.subscribe((data) => {
      this.individualDataForm = data;
    });

    // FORMULARIO PEDIDO GLOBAL
    // this.individualOrderForm = this.form.group({
    //   product: ['', [Validators.required, Validators.minLength(10)]],
    //   status: false,
    //   type: ['', [Validators.required, Validators.minLength(10)]],
    //   table: ['', [Validators.required, Validators.minLength(10)]],
    //   menu: false,
    //   comment: ['', [Validators.required, Validators.minLength(10)]],
    // });

    // this.individualOrderForm.valueChanges.subscribe((data) => {
    //   this.individualDataForm = data;
    // });
  }

  removeCartItem(index:any){
    this.globalPrice = 0;
    // console.log(this.shoppingCart);
    this.shoppingCart.splice(index,1);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(this.shoppingCart));
    for (const price of this.shoppingCart) {
      this.globalPrice += price.precio;
    }
  }

  pedir() {

    for (const item of this.shoppingCart) {
      const individualOrder = {
        product: item._id,
        status: false
      }

      this.api.postIndividualOrder(individualOrder).subscribe((order:any) => {
        this.idArrayShopping.push(order._id);
        if(this.idArrayShopping.length === this.shoppingCart.length) {
          const orderMain = {
            status: false,
            order: this.idArrayShopping
          }
      
        this.api.postOrder(orderMain).subscribe((res) => {
          // console.log(res);
          localStorage.removeItem("carrito");
          this.shoppingCart = [];
          this.toggleShoppingCart();
          this.route.navigate(['']);
        })
        }
      });

    }

    

  }

  addIndividualOrder(id:String, status:Boolean, menu:Boolean, tipo:String){
    // this.submited = true;
    // console.log(name,status);
    // if (this.individualOrderForm.valid) {
    //   let newForm: any = this.individualDataForm;
    //   console.log(newForm);
    //   this.api.postIndividualOrder(newForm).subscribe((res) => {
    //     console.log(res);
    //     this.individualOrderForm.reset();
    //     this.submited = false;
    //     // this.route.navigate(['/products','reload']);
    //   });
      const individualOrder = {
        product: id,
        status: status,
        menu: menu,
        // comment: comentario,
        type: tipo
      }
      // console.log(individualOrder)
      this.api.postIndividualOrder(individualOrder).subscribe((data)=>{
        // console.log(data);
      })
    }
  }



  // toggleShoppingCart2(){
  //   document.getElementById('checkbox')?.click()
  // }

  
