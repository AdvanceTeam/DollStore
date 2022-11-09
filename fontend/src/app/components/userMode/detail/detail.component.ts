import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { FormControl} from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { ListproductComponent } from '../listproduct/listproduct.component';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id!: string;
  name!: string;
  year!: number;
  user = "";
  address = "";

  constructor(public local:LocalStorageService,private router: Router) { }

  ngOnInit(): void {
    this.user = this.local.get('user').result.username;
    this.address = this.local.get('user').result.address;

  }


  
  getName(){
    return this.name;
  }


}
