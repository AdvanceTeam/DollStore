import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-manageproduct',
  templateUrl: './manageproduct.component.html',
  styleUrls: ['./manageproduct.component.css']
})
export class ManageproductComponent implements OnInit {

  products : any

  @Output() messageEvent = new EventEmitter<string>();
  themeColor: string = 'rgb(0,0,0)';
  fontColor: string = 'rgb(255,255,255)';
  theme: string ='light';

  constructor(private BookService: BookService) {
    this.onLoading();
  }

  ngOnInit(): void {
  }

  toggleTheme(){
    if(this.theme == 'dark'){
      this.theme = 'light';
      this.themeColor = 'rgb(255,255,255)';
      this.fontColor = 'rgb(0,0,0)';
    }else{
      this.theme = 'dark';
      this.themeColor = 'rgb(0,0,0)'
      this.fontColor = 'rgb(255,255,255)';
    }
    this.ngStyleMethod();

  }

  ngStyleMethod(){
    this.messageEvent.emit(this.themeColor)
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

}
