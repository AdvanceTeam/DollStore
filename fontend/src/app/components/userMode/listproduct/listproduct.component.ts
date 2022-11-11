import { Component, OnInit } from '@angular/core';
import { DollService } from 'src/app/services/doll.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { CartV2Service } from 'src/app/services/cart-v2.service';
import { FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {
  products: any;
  counter: any;
  user = "";
  keyword = new FormControl('');
  myGroup = new FormGroup({
    location : new FormControl('',[Validators.required])
  });
  sumDoll = 0;
  listCart!: [{
    item:String,
    quantity:number
  }];
  
  listDoll: {id:String,name:String,price:Number}[] = [];

  order : {
    userID:String,
    totalPayment:number,
    address: String,
    list:{
      idDoll:String,
      nameDoll:String
      quantity:number,
      costDoll:number
      }[]
  } = { userID:'',totalPayment:0,address:'',
    list:[]
  }



  constructor(
    private DollService: DollService, 
    public local:LocalStorageService,
    private router: Router,
    private CartV2Service:CartV2Service) 
  {

  }

  ngOnInit(): void {
    this.user = this.local.get('user').result.username;
    this.getCartById();
  }

  onLoading(){
    try{
      this.DollService.getProducts().subscribe(
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
  

  
  getDollById(element:{item:String,quantity:number}){
    this.DollService.getDollByID(element.item).subscribe(
        data =>{
          // console.log("get doll by id");
          // console.log(data);
          
          // this.listDoll.push({
          //   id:data._id,
          //   name:data.name,
          //   price:data.price
          // })

          let num = data.price * element.quantity; 
          // console.log("num ="+num);
          
          this.order.totalPayment = this.order.totalPayment + (data.price * element.quantity);
          this.sumDoll = this.sumDoll + element.quantity;
          this.order.list.push({
            idDoll:data._id,
            nameDoll:data.name,
            quantity:element.quantity,
            costDoll:data.price
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
            this.getDollById(this.listCart[index]);
          }
          // console.log("list doll");
          // console.log(this.listDoll);
          //now line listcart and listdoll alerdy use
          console.log("order before sumDoll = ");
          console.log(this.order);
          
          console.log(this.sumDoll);
          
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

  async minusTocart(idDoll:String){
    // console.log("token user:")
    // console.log(this.local.get('user').result.id);
    const token = this.local.get('user').result.id;
    console.log(idDoll);
    console.log("checkaddTocart working");
    
    try {
      this.CartV2Service.minusCart({idUser:token ,item:idDoll}).subscribe(
        data => {

          // console.log(data);
          this.order = { userID:'',totalPayment:0,address:'', list:[] };
          this.sumDoll = 0;
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

  signout(){
    this.local.clear();
    const loggedIn = localStorage.getItem('STATE');
    this.router.navigate(['login']);
  }

  get validateLocation() { return this.myGroup.get('location') as FormControl }

}