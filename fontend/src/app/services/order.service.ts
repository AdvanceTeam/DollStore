import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  products: any;
  constructor(private http:HttpClient) { }

  getOrders(){
    return this.http.get<any>('http://localhost:3000/bookstore/getorder')
    .pipe(map(data => {
      if (data) {
        this.products = data;
        //console.log(this.products);
      }
      return this.products;
    }))
  }

  deleteProduct(product : any){
    return this.http.post<any>('http://localhost:3000/bookstore/deleteorder', product)
    .pipe(map(data =>{
      return data;
    }))
  }

  addOrder(product : any){
    console.log('addOrder');
    console.log(product);
    return this.http.post<any>('http://localhost:3000/bookstore/addorder', product)
    .pipe(map(data =>{
      return data;
    }))
  }

  updateStateSend(item:any){
    return this.http.put<any>('http://localhost:3000/bookstore/updateStateOrder', item)
    .pipe(map(data =>{
      return data;
    }))
  }

}
