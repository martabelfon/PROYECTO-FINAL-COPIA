import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestService } from 'src/shared/api/request.service';
import { IProduct } from 'src/app/interface/iproduct';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  public productsList!: IProduct[];
  public filterProducts!: IProduct[];

  orders!:any;
  editForm!: FormGroup;
  editOrdersForm!: any;
  submited: boolean = false;

  constructor(private api: RequestService, private form: FormBuilder, private route: Router) {

    this.api.emitProduct.subscribe((data:any)=>{
      
      this.productsList = data;
      
    })
  }

  
  ngOnInit(): void {
    this.api.getOrders().subscribe((data:any)=>{
      this.orders = data;
      // console.log(this.orders)
    })
    this.productsList = this.api.productList;    

    
    // FORMULARIO
    this.editForm = this.form.group({
      status: false,
    });
  
    this.editForm.valueChanges.subscribe((data) => {
      this.editOrdersForm = data;
    });
  
    
  }

  updateIndividualOrder(order: any, index: number) {

    let orderUpdated: any = {...order, status: true};
    // console.log(orderUpdated);
    
    this.api.editIndividualOrderById(order._id, orderUpdated).subscribe((res: any)=> {

      const finsArray = this.orders[index].order.find((element:any) => element._id === res.old._id)
      
      // console.log("array", this.orders[index].order);
      // console.log("indexof", this.orders[index].order.indexOf(res.old));
      // console.log(this.orders[index].order[0] == res.old);
      
      // console.log("old", res.old);
      // console.log("new", res.new);
      
      // this.orders[index].order = res;
      this.orders[index].order.splice(this.orders[index].order.indexOf(finsArray), 1, res.new);

      

    })

  }

  orderToggle(item:any){

      const id = item._id;
      let newForm: any = {...item, status: true};
      // console.log(newForm);
      const myOrder = this.orders.find((order: any) => order._id === id);
      this.orders.splice(this.orders.indexOf(myOrder), 1, newForm);
      this.api.editOrderById(id, newForm).subscribe((res) => {
        // console.log(res);
        this.submited = false;
      });
  }
}
