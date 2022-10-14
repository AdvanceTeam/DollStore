import { Component, OnInit, Input } from '@angular/core';
import { CartV2Service } from '../services/cart-v2.service';
import { LocalStorageService } from 'angular-web-storage';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-cart-v2',
  templateUrl: './cart-v2.component.html',
  styleUrls: ['./cart-v2.component.css']
})
export class CartV2Component implements OnInit {

  @Input() item: any;
  listCart!: [{
    item:String,
    quantity:number
  }];
  
  listBook: {id:String,name:String,price:Number}[] = [];

  order : {
    totalPayment:number,
    list:{
      idBook:String,
      nameBook:String
      quantity:number,
      costBook:number
      }[]
  } = { totalPayment:0,
    list:[]
  }

  constructor(
      private CartV2Service:CartV2Service,
      public local:LocalStorageService,
      private BookService:BookService) 
      {
       
      }

  ngOnInit(): void {
    // this.getCartById();
  }

  checkaddTocart(){
    // console.log("token user:")
    // console.log(this.local.get('user').result.id);
    const token = this.local.get('user').result.id;
    
    try {
      this.CartV2Service.updateCart({idUser:token ,item:this.item._id}).subscribe(
        data => {

          // console.log(data);
        },
        err => {
         throw err;
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  getBookById(element:{item:String,quantity:number}){
    this.BookService.getBookByID(element.item).subscribe(
        data =>{
          // console.log("get book by id");
          // console.log(data);
          
          // this.listBook.push({
          //   id:data._id,
          //   name:data.name,
          //   price:data.price
          // })

          let num = data.price * element.quantity; 
          console.log("num ="+num);
          
          this.order.totalPayment = this.order.totalPayment + (data.price * element.quantity);
          this.order.list.push({
            idBook:data._id,
            nameBook:data.name,
            quantity:element.quantity,
            costBook:data.price
          })
        },
        err =>{
          console.log(err);
        }
    )
  }

  getCartById(){
    try {
      const token = this.local.get('user').result.id;
      this.CartV2Service.getCartByID(token).subscribe(
        data => {
          // console.log(data.product);
          this.listCart = data.product;
          for (let index = 0; index < this.listCart.length; index++) {
            this.getBookById(this.listCart[index]);
          }
          // console.log("list book");
          // console.log(this.listBook);
          //now line listcart and listbook alerdy use
          console.log(this.order);
          
        },
        err => {
         throw err;
        }
      )

    } catch (error) {
      console.log(error);
    }
  }



}//cartV2
