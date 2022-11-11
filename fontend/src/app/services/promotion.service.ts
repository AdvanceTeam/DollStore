import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {


  promotion: any
  constructor(private http: HttpClient, public local:LocalStorageService,) { }

  addPromotion(promotiondata:any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.post<any>('http://localhost:3000/dollstore/promotions/add',promotiondata,{headers:head_object})
      .pipe(map(data => {
        return data;
      }));
  }


  getPromotion(){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.get<any>('http://localhost:3000/dollstore/promotions/get',{headers:head_object})
      .pipe(map(data => {
        if(data){
          console.log(data)
          this.promotion = data;
        }
        return this.promotion;
      }))
  }

  deletepromotion(promotion : any){
    let token = this.local.get('user').token
    let head_object = new HttpHeaders().set("authorization",token)
    return this.http.delete<any>('http://localhost:3000/dollstore/deletepromotion/'+promotion,{headers:head_object})
    .pipe(map(data =>{
      return data;
    }))
  }

}



