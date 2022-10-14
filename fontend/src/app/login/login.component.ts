import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('customer')
  })

  constructor(private auth:AuthServiceService,public local:LocalStorageService,private router: Router) { }

  ngOnInit(): void {
  }

  signin(){
    console.log('Function signin on login.components');
    console.log(this.authForm.value);
    console.log('');
    // API login
    this.auth.getData(this.authForm.value).subscribe(
      data => {
        if(data.status == true){
          let role = this.auth.getRole();
          if (role === 'admin'){
            console.log('go to admin tap');
            this.router.navigate(['admin/Home']);
          }
          if (role === 'customer'){
            console.log('go to customer tap');
            this.router.navigate(['user']);
          }
          //alert('เข้าระบบแล้ว')
          console.log(data._value)
        }
      },
      err =>{
        console.log(err);
        alert('User or password is incorrect!');
      }
    );
  }

  signup(){
    console.log('Function signup on login.components');
    this.auth.signUp(this.authForm.value).subscribe(
      data => {
        alert(data.message)
      },
      err=>{
        alert('Sign Up failure!!!')
      }
    )
  }

  signout(){
    this.local.clear();
    const loggedIn = localStorage.getItem('STATE');
    alert('ออกจากระบบแล้ว')
  }

  goToDashBoard() {
    console.log('goToDashBoard() working');
    
    let role = this.auth.getRole();
    if (role === 'admin'){
      console.log('go to admin/Home');
      this.router.navigate(['admin/Home']);
    }
    if (role === 'customer'){
      console.log('go to customer tap');
      this.router.navigate(['user/products']);
    }
      
  }
}
