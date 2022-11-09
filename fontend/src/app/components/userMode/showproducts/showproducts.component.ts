import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { CartV2Service } from 'src/app/services/cart-v2.service';
import { OrderService } from 'src/app/services/order.service'
import Swal from 'sweetalert2'
import { FormControl, FormGroup, Validators} from '@angular/forms'
@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {
  products: any;
  show : boolean = true;
  counter: any;
  user = "";
  keyword = new FormControl('');
  myGroup = new FormGroup({
    location : new FormControl('',[Validators.required])
  });
  sumBook = 0;
  listCart!: [{
    item:String,
    quantity:number
  }];
  
  listBook: {id:String,name:String,price:Number}[] = [];

  order : {
    userID:String,
    totalPayment:number,
    address: String,
    list:{
      idBook:String,
      nameBook:String
      quantity:number,
      costBook:number
      }[]
  } = { userID:'',totalPayment:0,address:'',
    list:[]
  }

  constructor(
    private BookService: BookService, 
    public local:LocalStorageService,
    private router: Router,
    private CartV2Service:CartV2Service,
    private OrderService:OrderService) 
  {
    //this.onLoading()
  }

  ngOnInit(): void {
    this.user = this.local.get('user').result.username;
    
    this.getCartById();
  }

  onLoading(){
    try{
      this.BookService.getProducts().subscribe(
        data =>{
          this.products = data;
        },
        err =>{
          console.log(err)
        });
    }catch(error){
      console.log(error)
    }
  }

  receivData($event:any){
    this.products = $event;
  }

  receivCounter($event:any){
    this.counter = $event
  }

  signOut(){
    this.local.clear();
    const loggedIn = localStorage.getItem('STATE');
    this.router.navigate(['login']);
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
          // console.log("num ="+num);
          
          this.order.totalPayment = this.order.totalPayment + (data.price * element.quantity);
          this.sumBook = this.sumBook + element.quantity;
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
          console.log(data.product);
          this.listCart = data.product;
          for (let index = 0; index < this.listCart.length; index++) {
            this.getBookById(this.listCart[index]);
          }
          // console.log("list book");
          // console.log(this.listBook);
          //now line listcart and listbook alerdy use
          console.log("order before sumBook = ");
          console.log(this.order);
          
          console.log(this.sumBook);
          
        },
        err => {
         throw err;
        }
      )

    } catch (error) {
      console.log(error);
    }
  }

  relog(){
    console.log("can check ative");
    this.order = { userID:'',totalPayment:0,address:'', list:[] };
    
  }


  async checkaddTocart(idBook:String){
    // console.log("token user:")
    // console.log(this.local.get('user').result.id);
    const token = this.local.get('user').result.id;
    console.log(idBook);
    console.log("checkaddTocart working");
    
    try {
      this.CartV2Service.updateCart({idUser:token ,item:idBook}).subscribe(
        data => {

          //console.log(data);
          this.order = { userID:'',totalPayment:0,address:'', list:[] };
          this.sumBook = 0;
          this.getCartById();
          
        },
        err => {
         throw err;
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  async minusTocart(idBook:String){
    // console.log("token user:")
    // console.log(this.local.get('user').result.id);
    const token = this.local.get('user').result.id;
    console.log(idBook);
    console.log("checkaddTocart working");
    
    try {
      this.CartV2Service.minusCart({idUser:token ,item:idBook}).subscribe(
        data => {

          // console.log(data);
          this.order = { userID:'',totalPayment:0,address:'', list:[] };
          this.sumBook = 0;
          this.getCartById();
          
        },
        err => {
         throw err;
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  exposureTocart(item:any){
    console.log(item);
    
  }

  confirmOrder(){
    this.order.userID = this.local.get('user').result.id;
    Swal.fire({
      title: 'ยืนยันการสั่งซื้อ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.order.address = this.myGroup.value.location;
        // console.log(this.order);
        this.OrderService.addOrder(this.order).subscribe(
          data => {

            // console.log(data);
                        this.order = { userID:'',totalPayment:0,address:'', list:[] };
            this.sumBook = 0;
            this.getCartById();
            
          },
          err => {
           throw err;
          }
        )
        
        

        Swal.fire(
          'บันทึก!',
          'ระบบได้บันทึกคำสั่งซื้อแล้ว',
          'success'
        )
      }
    })
  }

  get validateLocation() { return this.myGroup.get('location') as FormControl }

}
