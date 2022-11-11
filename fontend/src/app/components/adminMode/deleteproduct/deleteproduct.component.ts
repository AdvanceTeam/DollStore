import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DollService } from '../../../services/doll.service'

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {

  products: any;

  previewLoaded: boolean = false;

  constructor(private ps: DollService) { 
    this.onLoading();
  }

  ngOnInit(): void {
  }

  deleteproduct(item:any){
    console.log("กด delete",item);
    
    try {
      this.ps.deleteProduct(item).subscribe(
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
    this.onLoading();
  }

  onLoading(){
    try {
      this.ps.getProducts().subscribe(
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


}
