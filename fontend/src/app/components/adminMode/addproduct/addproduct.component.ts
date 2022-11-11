import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DollService } from '../../../services/doll.service'
import { PromotionService } from 'src/app/services/promotion.service';
import { ManageproductComponent } from '../manageproduct/manageproduct.component';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  promotions: any;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required,Validators.min(1)]),
    stock: new FormControl('', [Validators.required,Validators.min(1)]),
    detail: new FormControl('', [Validators.required]),
    promotion: new FormControl('', [Validators.required]),
    file: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private ps: DollService, private promotionservice: PromotionService) {
    this.loadpromotion()
  }

  @Output() messageEvent = new EventEmitter<string>();

  //========== theme mode ==========
  themeColor!: string;
  lightColor: String="rgb(220, 252, 230)";
  darkColor : String="rgb(63,71,66)";

  fontColor!: String;
  bgColor!: String;

  changeTheme(theme: string){
    if(theme =='light'){
      this.fontColor = this.darkColor;
      this.bgColor = this.lightColor;
      // console.log(this.fontColor)
    }
    else if(theme =='dark'){
      this.fontColor = this.lightColor;
      this.bgColor = this.darkColor;
      // console.log(this.fontColor)
    }
    
  }


  ngOnInit(): void {
    //this.themeColor = 'light';
    this.fontColor = this.darkColor;
    this.bgColor = this.lightColor;
  }


  addProduct() {
    this.ps.addProduct(this.productForm.value).subscribe({
      next:data => {
        console.log(data)
        alert('Product added successfully');
        this.resetForm();
        this.load();
      },
      error:err => {
        console.log(err);
      }
    }
     
    );
  }

  load() {
    try {
      this.ps.getProducts().subscribe({
        next: data => {
          this.productForm = data;
          console.log(data)
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (err) {
      console.log(err);
    }
  }


  loadpromotion() {
    try {
      this.promotionservice.getPromotion().subscribe({
        next: data => {
          this.promotions = data;
          console.log(data)
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (err) {
      console.log(err);
    }
  }


  onChangeImg(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.productForm.patchValue({
          img: reader.result?.toString()
        })
      }
    }
  }

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get stock() {
    return this.productForm.get('stock');
  }

  get detail() {
    return this.productForm.get('detail');
  }

  get file() {
    return this.productForm.get('file');
  }

  get promotion() {
    return this.productForm.get('promotion');
  }

  // onChangeImg(e: any) {
  //   if (e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     var pattern = /image-*/;
  //     const reader = new FileReader();
  //     if (!file.type.match(pattern)) {
  //       alert('Invalid format');
  //       this.productForm.reset();
  //     } else {
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         this.previewLoaded = true;
  //         this.productForm.patchValue({
  //           img: reader.result?.toString()
  //         });
  //       };
  //     }
  //   }
  // }

  resetForm() {
    this.productForm.reset();
    this.previewLoaded = false;
  }

}
