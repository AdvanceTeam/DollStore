import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';
import { cartsType } from 'src/app/cart.model';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-buy-products',
  templateUrl: './buy-products.component.html',
  styleUrls: ['./buy-products.component.css']
})
export class BuyProductsComponent implements OnInit {

  @Input() item: any;
  cart: cartsType = [];
  show: boolean = true;
  show1: boolean = true;
  price: number =0;
  count: number = 0;

  constructor(private BookService:BookService,private CartService:CartService) {
  }
    
  ngOnInit(): void {
  }

  addtoCart(){
    console.log("add new product -->",this.item)
    console.log(this.item); //รับมาจาก componet เลือกหนังสือ
    if(this.item.quantity == 0){ //ตรวจสอบสินค้าใน stock ว่าหมดหรือยัง
      this.show = false;
      // this.count = 0; //น่าจะ นับจำนวนหนังสือของ component นี้
    }else{
      this.count +=1; 

    this.CartService.getFromBuy(this.item);  // ส่งไปกดที่ตัวแปรร่วม
    //this.updateMinusStock(this.item,1); //ลบไปแล้ว T T  ใจเย็นก่อนนนนน
    }
  }

  checkaddTocart(){
    if(this.item.quantity == this.count){
      alert("ไม่สามารถเพิ่มได้มากกว่านี้แล้ว")
    }else{
      this.addtoCart();
    }
  }

  deleteCart(){
    //console.log("delete product",this.item)
    if(this.count ==0){
      //this.show1 = false;
    }else{
      this.count -=1;
      this.CartService.deleteElementCart(this.item)
      //this.updatePlusStock(this.item,1)    //อย่าพึ่งลบ ใจเยนน
    }
    
  }

  checkdeleteTocart(){
    if(this.count == 0){
      console.log('คุณไม่มีสินค้าในตะกร้า');
      
    }else{
      this.deleteCart();
    }
  }

  getTotal(){
    return this.count;
  }

  updatePlusStock(item:any,count:any){ // count=1 เพราะ เซ็ทให้ส่ง 1 มาลบ
    //console.log(item+"--> newQ = "+count);
    if( count === undefined) count=0;
    this.item.quantity = this.item.quantity + count;

    try {
      this.BookService.updateBook(this.item).subscribe(
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


  updateMinusStock(item:any,count:any){
    //console.log(item+"--> newQ = "+count);
    if( count === undefined) count=0;
    item.quantity = item.quantity - Number(count);
    if(item.quantity == 0){
      this.show = !this.show
    }
    try {
      this.BookService.updateBook(this.item).subscribe(
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
