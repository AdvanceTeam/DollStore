import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class CartV2Service {

  constructor(private http:HttpClient, public local:LocalStorageService) { }

  updateCart(product: any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.put<any>('http://localhost:3000/bookstore/additemtocart', product,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }

  minusCart(product: any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.put<any>('http://localhost:3000/bookstore/minustocart', product,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }


  getCartByID(id: string){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.get<any>('http://localhost:3000/bookstore/getcart/'+id,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }

}
