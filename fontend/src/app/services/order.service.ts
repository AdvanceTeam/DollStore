import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  products: any;
  constructor(private http:HttpClient, public local:LocalStorageService,) { }
  

  getOrders(){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.get<any>('http://localhost:3000/dollstore/getorder',{headers:head_object})
    .pipe(map(data => {
      if (data) {
        this.products = data;
        //console.log("this is product",this.products);
      }
      return this.products;
    }))
  }

  deleteProduct(product : any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.post<any>('http://localhost:3000/dollstore/deleteorder', product,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }

  addOrder(product : any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    console.log('addOrder');
    console.log(product);
    return this.http.post<any>('http://localhost:3000/dollstore/addorder', product,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }

  updateStateSend(item:any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.put<any>('http://localhost:3000/dollstore/updateStateOrder', item,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }

}
