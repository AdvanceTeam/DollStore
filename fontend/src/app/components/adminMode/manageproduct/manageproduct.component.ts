import { Component, OnInit, Input, Output, EventEmitter ,ViewChild } from '@angular/core';
import { DollService } from 'src/app/services/doll.service';

import { AddproductComponent } from '../addproduct/addproduct.component';
import { EditproductComponent } from '../editproduct/editproduct.component';

@Component({
  selector: 'app-manageproduct',
  templateUrl: './manageproduct.component.html',
  styleUrls: ['./manageproduct.component.css']
})
export class ManageproductComponent implements OnInit {

  products : any

  @Input()
  data!: any;

  @ViewChild(AddproductComponent)
  addproductComponent!: AddproductComponent;

  @ViewChild(EditproductComponent)
  editproductComponent!: EditproductComponent;

  bgColor: string = 'rgb(255,255,255)';
  fontColor: string = 'rgb(0,0,0)';
  theme: string ='light';


  constructor(private DollService: DollService) {
    this.onLoading();
  }

  ngOnInit(): void {
    this.bgColor = 'rgb(255,255,255)';
    this.fontColor = 'rgb(0,0,0)';
    this.theme ='light';

  }

  toggleTheme(){
    if(this.theme == 'dark'){
      this.theme = 'light';
      this.bgColor = 'rgb(255,255,255)';
      this.fontColor = 'rgb(0,0,0)';
    }else{
      this.theme = 'dark';
      this.bgColor = 'rgb(0,0,0)'
      this.fontColor = 'rgb(255,255,255)';
    }
    this.addproductComponent.changeTheme();
    
    this.editproductComponent.changeTheme(this.theme);
  }

  refresh(){
    // this.onLoading();
    window.location.reload();
  }

  update(){
    this.onLoading();
  }


  onLoading(){
    try{
      this.DollService.getProducts().subscribe(
        data =>{
          this.products = data;
          console.log(data)
        },
        err =>{
          console.log(err)
        });
    }catch(error){
      console.log(error)
    }
  }

}
