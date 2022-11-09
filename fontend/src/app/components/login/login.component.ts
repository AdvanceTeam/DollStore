import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]),
    role: new FormControl('')
    // address: new FormControl('')
  })

  constructor(private auth:AuthServiceService,public local:LocalStorageService,private router: Router) { }

  ngOnInit(): void {
  }
  get f() {
    return this.authForm.controls;
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
            this.router.navigate(['admin/manageproduct']);
          }
          if (role === 'customer'){
            console.log('go to customer tap');
            this.router.navigate(['user/showproduct']);
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
      console.log('go to admin/manageproduct');
      this.router.navigate(['admin/manageproduct']);
    }
    if (role === 'customer'){
      console.log('go to customer/showproduct');
      this.router.navigate(['user/showproduct']);
    }
      
  }
  show: boolean=false; 
  onClick(){
    this.show = !this.show
  }
}
