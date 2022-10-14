import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class CartV2Service {

  constructor(private http:HttpClient, public local:LocalStorageService) { }

  updateCart(product: any){
    return this.http.put<any>('http://localhost:3000/bookstore/additemtocart', product)
    .pipe(map(data =>{
      return data;
    }))
  }

  minusCart(product: any){
    return this.http.put<any>('http://localhost:3000/bookstore/minustocart', product)
    .pipe(map(data =>{
      return data;
    }))
  }


  getCartByID(id: string){
    return this.http.get<any>('http://localhost:3000/bookstore/getcart/'+id)
    .pipe(map(data =>{
      return data;
    }))
  }

}
