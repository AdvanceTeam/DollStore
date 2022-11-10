import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-manageproduct',
  templateUrl: './manageproduct.component.html',
  styleUrls: ['./manageproduct.component.css']
})

export class ManageproductComponent implements OnInit {
  products: any

  ngOnInit(): void{
  }

  constructor(private BookService: BookService) {
    this.onLoading();
  }

  onLoading(){
    try{
      this.BookService.getProducts().subscribe(
        {next : data =>{
          console.log(data)
          this.products = data;
        },
        error : err =>{
          console.log(err)
        }});
    }catch(error){
      console.log(error)
    }
  }
}
