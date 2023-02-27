import { IProduct } from './../../../app/interface/iproduct';
import { RequestService } from 'src/shared/api/request.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {

  @Input() public product!: IProduct;
  @Output() close = new EventEmitter<void>();

  closePopup(){
    this.close.emit()
  }


  // @Input() IProduct:any;

}
