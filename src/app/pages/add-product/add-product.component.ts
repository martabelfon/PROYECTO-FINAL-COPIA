import { IProduct } from './../../interface/iproduct';
import { RequestService } from './../../../shared/api/request.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addForm!: FormGroup;
  addProductForm!: IProduct;
  submited: boolean = false;
  //submitedMenu: boolean = false;

  alergenGroup: string[] = [
    'Altramuces',
    'Apio',
    'Cacahuetes',
    'Crustaceos',
    'FrutosSecos',
    'Gluten',
    'Huevos',
    'Lacteos',
    'Marisco',
    'Mostaza',
    'Pescado',
    'Sesamo',
    'Soja',
    'Sulfitos',
  ];

  tiposGroup: String[] = [
    "Carne",
    "Pescado",
    "Ensalada",
    "Legumbres",
    "Verdura",
    "Sopa",
    "Tostada",
    "Bocadillo",
    "Pasta",
    "Arroz",
    "Postre",
    "Tapa",
    "Pizza",
    "Vinotinto",
    "Vinoblanco",
    "Vinorosado",
    "Combinado",
    "Cava",
    "Cafe",
    "Cerveza",
    "Bebida"
  ]

  constructor(
    private form: FormBuilder,
    private api: RequestService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.addForm = this.form.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      imagen: ['', [Validators.required, Validators.minLength(10)]],
      precio: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(6)]],
      alergenos: this.form.array([]),
      id: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      menu: false,
      carta: false,
    });

    this.addForm.valueChanges.subscribe((data) => {
      this.addProductForm = data;
    });
  }

  addFormulary() {
    this.submited = true;
    if (this.addForm.valid) {
      let newForm: IProduct = this.addProductForm;
      // console.log(newForm);
      this.api.postProduct(newForm).subscribe((res) => {
        // console.log(res);
        this.addForm.reset();
        this.submited = false;
        this.route.navigate(['/products','reload']);
      });
    }
  }
 
  onCheckboxChange(e:any) {
    const alergenos: FormArray = this.addForm.get('alergenos') as FormArray;
    if (e.target.checked) {
      alergenos.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      alergenos.controls.forEach((item) => {
        if (item.value == e.target.value) {
          alergenos.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
