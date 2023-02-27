import { UsersService } from './../../../shared/users/users.service';
import { RequestService } from './../../../shared/api/request.service';
import { IProduct } from './../../interface/iproduct';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private user:UsersService){}

  ngOnInit(): void {

    
  }

}


