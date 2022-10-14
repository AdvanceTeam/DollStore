import { Injectable } from '@angular/core';
import { cartsType } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { BookService } from 'src/app/services/book.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  carts : cartsType = [];
  price: number = 0;

  stop = false;
  constructor(private http:HttpClient, private BookService:BookService) { }

  getFromBuy(item:any){
    this.carts.push(item) // เพิ่ม หนังสือเข้าไปเก็บ เป็น [{หนังสือ1},{หนังสือ2},{หนังสือ3}]
    //console.log("From Cs ",this.carts) //
    this.price += item.price //ร่วมราคา
    //console.log("price fromBuy",this.price) //
  }

  deleteFormCart(item:any){
    this.carts[item].quantity+=1; 
    this.price -= this.carts[item].price;
    console.log("price from delete"+this.price)
    this.carts.splice(item,1);
  }

  getCart(){
    return this.carts;
  }

  getTotal(){
    return this.carts.length;
  }

  getTotalPrice(){
    return this.price;
  }

  addOrder(product : any){
    console.log('addOrder');
    console.log(product);
    return this.http.post<any>('http://localhost:3000/bookstore/addorder', product)
    .pipe(map(data =>{
      return data;
    }))
  }

  deleteElementCart(item:any){
    this.carts.forEach((element,index)=>{
    if(this.stop == false){  
      if(element==item){ 
        this.price = this.price - item.price;
        delete this.carts[index];
        this.stop = true;   
      };
    }
   }
   );
   this.stop = false;
  }

  resetCart(){
      console.log('resetCart working');
      console.log(this.carts);
    for (const element of this.carts) { // [{หนังสือ1},{หนังสือ2},{หนังสือ1}]
      console.log("เกิดอะไรขึ้น  ",element);
      if(element != undefined){
        element.quantity = element.quantity -1;
        this.updateMinusStock(element);
      }
      
    }
    this.carts = [];
    //console.log('after reset',this.carts);  // โหล่งจิง
  }

  updateMinusStock(item:any){  // item จะเป็นตัวที่ได้จาก for มาลบ
    //console.log(item+"--> newQ = "+count);
    console.log("item จากการรีเซ็ตตะกร้า", item);
    
    try {
      this.BookService.updateBook(item).subscribe(
        data => {
          //this.products = data;
        },
        err => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

}
