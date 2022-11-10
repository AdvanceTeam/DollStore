import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manageproduct',
  templateUrl: './manageproduct.component.html',
  styleUrls: ['./manageproduct.component.css']
})
export class ManageproductComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();
  themeColor: string = 'rgb(0,0,0)';
  fontColor: string = 'rgb(255,255,255)';
  theme: string ='light';

  constructor() { }

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

}
