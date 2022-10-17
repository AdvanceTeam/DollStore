import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

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
