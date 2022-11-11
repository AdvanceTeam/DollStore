import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

import { ManageproductComponent } from '../../adminMode/manageproduct/manageproduct.component';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public local:LocalStorageService,private router: Router) { }
  user = "";
  ngOnInit(): void {
    this.user = this.local.get('user').result.username;
  }

  signout(){
    this.local.clear();
    const loggedIn = localStorage.getItem('STATE');
    this.router.navigate(['login']);
  }



}
