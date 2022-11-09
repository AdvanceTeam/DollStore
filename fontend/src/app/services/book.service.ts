import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import {cartsType} from '../cart.model';

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

  constructor(private http:HttpClient) { }

  add(p_id: number){
    this.counter += 1;
  }

  getCounter(){
    return this.counter;
  }

  addProduct(product : any){
    return this.http.post<any>('http://localhost:3000/bookstore/addbook', product)
    .pipe(map(data =>{
      return data;
    }))
  }

  getProducts(){
    return this.http.get<any>('http://localhost:3000/bookstore/getAllBook')
    .pipe(map(data => {
      if (data) {
        this.products = data;
        console.log(this.products);
      }
      return this.products;
    }))
  }

  deleteProduct(product : any){
    return this.http.delete<any>('http://localhost:3000/bookstore/deletebook/'+product)
    .pipe(map(data =>{
      return data;
    }))
  }

  updateBook(product: any){
    return this.http.put<any>('http://localhost:3000/bookstore/updateQuantityBook', product)
    .pipe(map(data =>{
      return data;
    }))
  }

  updateBookByName(product: any){
    return this.http.put<any>('http://localhost:3000/bookstore/updateQuantityBook', product)
    .pipe(map(data =>{
      return data;
    }))
  }
 

  getSomePs(p_id:any){
    return this.products[p_id];
  }

  getBySearch(keyword:any){
    return this.http.get<any>('http://localhost:3000/bookstore/search/'+keyword)
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
    return this.http.get<any>('http://localhost:3000/bookstore/getBookByID/'+id)
    .pipe(map(data => {
      return data;
    }))
  }

}
