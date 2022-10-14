import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { FormControl, FormGroup, Validators} from '@angular/forms'
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  products: any;
  
  item = {_id: Number}

  newQ !: Number;

  updateitem = {
    "_id": Number,
    "quantity": Number
  }

  constructor(private bookservice:BookService) {
    this.onLoading();
   }

  ngOnInit(): void {
  }

  onLoading(){
    try {
      this.bookservice.getProducts().subscribe(
        data => {
          this.products = data;
        },
        err => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
      
    }
  }

  updateStock(item:any){
    console.log(item);
    console.log(this.newQ);
    
  }

  editbook(){

  }

  deletebook(item:any){
    console.log(item);
    this.item._id = item;

    console.log("sadddd",this.item);
    
    try {
      this.bookservice.deleteProduct(this.item._id).subscribe(
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
    this.onLoading();
    //window.location.reload();
  }
}
