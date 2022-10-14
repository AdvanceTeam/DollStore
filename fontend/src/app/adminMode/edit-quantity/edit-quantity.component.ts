import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-edit-quantity',
  templateUrl: './edit-quantity.component.html',
  styleUrls: ['./edit-quantity.component.css']
})
export class EditQuantityComponent implements OnInit {

  @Input() item: any;
 
  //newQ !: Number;
  newQ = 0;

  constructor(private BookService:BookService) { }

  ngOnInit(): void {
  }


  updatePlusStock(){
    //console.log(this.item.name,"--> newQ = ",this.newQ);
    if( this.newQ === undefined) this.newQ=0;
    this.item.quantity = this.item.quantity + this.newQ;
    console.log(this.item, "ไอเทมจาก stock");
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
   // window.location.reload();
  }

  updateMinusStock(){
    console.log(this.item.name+"--> newQ = "+this.newQ);
    if( this.newQ === undefined) this.newQ=0;
    this.item.quantity = this.item.quantity - Number(this.newQ);

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
    window.location.reload();
  }
}
