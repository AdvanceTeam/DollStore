import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {


  promotion: any
  constructor(private http: HttpClient) { }

  addPromotion(promotiondata:any){
    return this.http.post<any>('http://localhost:3000/dollstore/promotions/add',promotiondata)
      .pipe(map(data => {
        return data;
      }));
  }


  getPromotion(){
    return this.http.get<any>('http://localhost:3000/dollstore/promotions/get')
      .pipe(map(data => {
        if(data){
          this.promotion = data;
        }
        return this.promotion;
      }))
  }

}



