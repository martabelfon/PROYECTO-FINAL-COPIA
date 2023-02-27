import { Component, ImportedNgModuleProviders, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { IProduct } from 'src/app/interface/iproduct';
import { RequestService } from 'src/shared/api/request.service';
import { MenuProductComponent } from 'src/shared/components/menu-product/menu-product.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  addMenuForm!: FormGroup;
  submited: boolean = false;
  platosMenu!: any;
  submitedMenu: boolean = false;
  productsList!: any;
  menuToSend!: any;
  menu!: any;
  public checked?: any;
  plato!: any;
  token!: any;

  constructor(private form: FormBuilder, private api: RequestService, private route: Router){
    
  }
  ngOnInit(): void {

    this.productsList = this.api.productList;
    // console.log(this.productsList);
   
    this.platosMenu = this.productsList.filter(
        
      (productsList: any) => {
    
      return productsList.menu;
    
    });

    // console.log(this.platosMenu);
    
    
    this.api.emitProduct.subscribe((data:any)=>{
      // console.log(data);
      
      this.productsList = data;
      this.platosMenu = this.productsList.filter(
        
        (productsList: any) => {
      
        return productsList.menu;
      
      }); 
      // console.log(this.platosMenu);
    })

    this.api.getProductByMenu().subscribe((res:any)=>{
      this.menu = res;
      // console.log(res);
      
    })
    this.addMenuForm = this.form.group({
      name: [
        '',
        [
        Validators.minLength(2),
        Validators.maxLength(100),
        ],
      ],
      platosprincipales: this.form.array([]),
      platossecundarios: this.form.array([]),
      postres: this.form.array([]),
      precio: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      
    });
    
    this.addMenuForm.valueChanges.subscribe((data) => {
      this.menuToSend = data;
      // console.log(this.menuToSend);
      
    }); 
    this.token = localStorage.getItem("token");
    
}
  
  addMenu() {
    this.submited = true;
    // console.log(this.addMenuForm.value)
    if (this.addMenuForm.valid) {
      let newForm: any = this.menuToSend;
      // console.log(newForm);
      // this.api.deleteMenu().subscribe((data:any)=>{
      //   console.log(data);
      //   this.addMenuForm
      
      this.api.postMenu(newForm).subscribe((res:any) => {
        // console.log(res);
        this.api.getProductByMenu().subscribe((res:any)=>{
          this.menu = res;
          // console.log(this.menu);
          // console.log(res);
          
        })
        this.addMenuForm.reset();
        // const inputsToDelete = document.querySelectorAll(".dom") as NodeListOf<HTMLInputElement>
        // inputsToDelete.forEach((element) => {
        //   console.log(element)
        //   element.checked = false;
        // });
        this.submited = false;
        // location.reload();
      });
    }
  }
  // onCheckboxChange(e:any, plato:any) {
  //   this.checked = document.querySelector('#check') as HTMLInputElement
  //   const product: FormArray = this.addMenuForm.get(plato) as FormArray;
  //   if (e.target.checked) {
  //     product.push(new FormControl(e.target.value));
  //   } else {
  //     let i: number = 0;
  //     product.controls.forEach((item) => {
  //       if (item.value == e.target.value) {
  //         product.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }
emiter(producto: any){
  // console.log(producto);
  
  const product: FormArray = this.addMenuForm.get(producto.plato) as FormArray;
  if (producto.checked) {
    // console.log(producto.product._id);
    
    product.value.push(producto.product._id);
      } else {
        product.controls.forEach((item, i) => {
          if (item.value == producto.product) {
            product.removeAt(i);
            return;
          }
        });
      }
  }

}
