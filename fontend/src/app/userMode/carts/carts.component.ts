import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { cartsType } from 'src/app/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  addr = new FormControl('')
  count = 0;
  carts : any;
  order: any;

  book = [{
    _id:String,
    namebook:String,
    amount:Number
  }]

  constructor(private cs: CartService,private BookService:BookService) { 
  }

  getCart(){
    return this.cs.getCart();
  }

  ngOnInit(): void {
  }

  getSumPrice(){
    return this.cs.getTotalPrice();
  }

  getCounter(){
    return this.cs.getTotal();
  }

  confirm(){
    console.log('ยืนยันการซื้อ');
    console.log('สินค้าที่สั่งซื้อ');
    console.log(this.cs.getCart());
    console.log('ราคาที่ต้องจ่าย');
    console.log(this.cs.price);

    var myobj=this.cs.getCart();
    //for (i in myobj) if (myobj.hasOwnProperty(k)) ++count;
    //console.log('หาไรสักอย่าง');
    //console.log(Object.keys(myobj).length);
    let arrayid = [];
    let arrayname = [];
    let unique
    let c1
    
    let num1=myobj.length
    for (const property in myobj) {
      console.log(`${property}: ${myobj.values}`);
    }
    for(var index in myobj)
    { 
        //console.log(myobj[index]);
        arrayid.push(myobj[index].id)  
        arrayname.push(myobj[index].name)
        //console.log('arrayid');
        //console.log(arrayid);
        //console.log('arrayname');
        //console.log(arrayname); 
        //console.log(c1);
    }
    unique = arrayname.filter((item, i, ar) => ar.indexOf(item) === i);
        //console.log(unique);
        // Thank you Spectric, Josh Mc, Charles Clayton, David Sherret from stackoverflow.com
        // hope heven space for you
        let counts:any = {};
        arrayname.forEach( (x) => { counts[x] = (counts[x] || 0) + 1; });
        console.log(counts)
        //console.log(typeof counts);
        counts.price = this.cs.price;
        counts.adders = this.addr.value;

        console.log(counts);
        c1 = JSON.stringify(counts)
        this.cs.addOrder({order:c1}).subscribe(
          data => {
            console.log();
            this.cs.resetCart();
            alert('รายการสั่งซื้อได้บันทึกแล้ว!!!')
          },
          err => {
            console.log(err);
          }
        );

        //window.location.reload();
  }

}
