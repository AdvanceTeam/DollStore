import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { BookService } from 'src/app/services/book.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  item = {"_id": Number}
  products: any;
  JsonProduct: any;

  public num = "num"

  constructor(private OrderService:OrderService,private bookService:BookService ) { }

  ngOnInit(): void {
    this.onLoading();
  }

  onLoading(){
    try {
      this.OrderService.getOrders().subscribe(
        data => {
          this.products = data;
          //this.JsonProduct = JSON.parse(this.products);
          //console.log(this.JsonProduct.price);
          
        },
        err => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
      
    }
  }

  sendbook(item:any){
    console.log(item);
    this.OrderService.updateStateSend(item).subscribe(
      data => {
        // this.products = data;
        //this.JsonProduct = JSON.parse(this.products);
        //console.log(this.JsonProduct.price);
        console.log("send success");
        
        this.onLoading();
      },
      err => {
        console.log(err);
      }
    );
  }

}

@Pipe({name: 'truncate'})
export class TruncatePipe implements OnInit, PipeTransform {

  dataBook!:[
    {
        _id: String,
        name: String,
        tag: String,
        quantity: Number,
        price: Number,
        file: String,
        img: String
    }
  ];

  constructor(private bookService:BookService) { 
   
  }

  ngOnInit(): void {
    this.bookService.getProducts().subscribe(
      data =>{
        this.dataBook = data
      },
      err =>{})
  }
  
  transform(idBookHTML:String): Observable<string>  {
    console.log("transform working");
    return this.bookService.getProducts().pipe(
      map(data =>{
        for (let index = 0; index < data.length; index++) {
          if (idBookHTML == data[index]._id) {
            console.log(data[index].name);  
            return data[index].name
          }
        }
      })
    )
   
  }

}
