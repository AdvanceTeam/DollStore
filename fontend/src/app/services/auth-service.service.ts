import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
      products: any;
      isLogin = false;
    
      roleAs!: string;
    
      constructor( private http: HttpClient, public local:LocalStorageService) { }

      // set เพื่อ ไว้ เช็ค route
      login(value: string) {
        this.isLogin = true;
        this.roleAs = value;
        localStorage.setItem('STATE', 'true');
        localStorage.setItem('ROLE', this.roleAs);
        return of({ success: this.isLogin, role: this.roleAs });
      }
    
      logout() {
        this.isLogin = false;
        this.roleAs = '';
        localStorage.setItem('STATE', 'false');
        localStorage.setItem('ROLE', '');
        return of({ success: this.isLogin, role: '' });
      }
    
      isLoggedIn() {
        const loggedIn = localStorage.getItem('STATE');
        if (loggedIn == 'true'){
          this.isLogin = true;
          
        }
        else{
          this.isLogin = false;
          alert('คุณยังไม่ได้ login');
        }
         
        return this.isLogin;
      }
    
      getRole() {
        //this.roleAs = localStorage.getItem('ROLE')+'';
        console.log('getRole func-- return --->'+ this.roleAs)
        //console.log(this.roleAs);
        let data = String(localStorage.getItem('ROLE'));
        //route.data.role.indexOf(userRole)
        var obj = JSON.parse(data);
        if(obj == undefined){
          this.roleAs= ''
        }else{
          this.roleAs = obj._value;
        }
        return this.roleAs;
        //return 'admin'
      }


       // คือ login ไปที่ backend
       getData(authData: any){
        return  this.http.post<any>('http://localhost:3000/bookstore/signin',authData)
        .pipe(map(data =>{
          if(data){
            this.local.set('user', data, 1, 'h');
            this.local.set('ROLE', data.result.role, 1, 'h');
            localStorage.setItem('STATE', 'true');
            //console.log('function getdata working');
            //console.log(this.local.get('user'));
            //console.log('try get Role');
            //console.log(this.local.get('user.result'));
            //console.log(data.result.role);
            this.roleAs = data.result.role;
          }
          return data;
      }));
      }

      
      signUp(authData: any){
        return this.http.post<any>('http://localhost:3000/bookstore/signup',authData)
        .pipe(map(data =>{
          if(data){
           
          }
          return data;
      }));
      }

      updatePassword(product: any){
        return this.http.put<any>('http://localhost:3000/bookstore/resetPassword', product)
        .pipe(map(data =>{
          return data;
        }))
      }


      getUsersData(){
        return this.http.get<any>('http://localhost:3000/bookstore/getUser')
        .pipe(map(data => {
          if (data) {
            this.products = data;
            //console.log(this.products);
          }
          return this.products;
        }))
      }

      deleteProduct(product : any){
        return this.http.delete<any>('http://localhost:3000/bookstore/deleteUser/'+product)
        .pipe(map(data =>{
          return data;
        }))
      }
}
