import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manageproduct',
  templateUrl: './manageproduct.component.html',
  styleUrls: ['./manageproduct.component.css']
})
export class ManageproductComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();
  themeColor: string = '';
  theme: string ='light';

  constructor() { }

  ngOnInit(): void {
  }

  toggleTheme(){
    this.theme = 'dark' ? 'light' : 'dark'
  }

  ngStyleMethod(){
    if(this.theme == 'light'){
      this.themeColor = 'rgb(255,255,255)'
    }else if(this.themeColor == 'dark'){
      this.themeColor = 'rgb(0,0,0)'
    }
    this.messageEvent.emit(this.themeColor)
  }

}
