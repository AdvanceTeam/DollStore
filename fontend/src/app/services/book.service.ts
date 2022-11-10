import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import {cartsType} from '../cart.model';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  products: any;
  search: any;
  fromproduct: any;
  counter: number = 0;
  sumPrice: number = 0;
  cart: cartsType = []

  constructor(private http: HttpClient, public local:LocalStorageService,) { }

  add(p_id: number){
    this.counter += 1;
  }

  getCounter(){
    return this.counter;
  }

  addProduct(product : any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.post<any>('http://localhost:3000/bookstore/addbook', product,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }

  getProducts(){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.get<any>('http://localhost:3000/bookstore/getAllBook',{headers:head_object})
    .pipe(map(data => {
      if (data) {
        this.products = data;
        console.log(this.products);
      }
      return this.products;
    }))
  }

  deleteProduct(product : any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.delete<any>('http://localhost:3000/bookstore/deletebook/'+product,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }

  updateBook(product: any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.put<any>('http://localhost:3000/bookstore/updateQuantityBook', product,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }

  updateBookByName(product: any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.put<any>('http://localhost:3000/bookstore/updateQuantityBook', product,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }
 

  getSomePs(p_id:any){
    return this.products[p_id];
  }

  getBySearch(keyword:any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.get<any>('http://localhost:3000/bookstore/search/'+keyword,{headers:head_object})
    .pipe(map(data => {
      if (data) {
        this.search = data;
        console.log(this.search);
      }
      return this.search;
    }))
  }

  getFromProduct(item:any){
    this.fromproduct = item;
  }

  sendToBooks(){
    return this.fromproduct;
  }

  getBookByID(id:String){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.get<any>('http://localhost:3000/bookstore/getBookByID/'+id,{headers:head_object})
    .pipe(map(data => {
      return data;
    }))
  }

}
