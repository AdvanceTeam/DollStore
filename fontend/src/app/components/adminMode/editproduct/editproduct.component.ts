import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DollService } from '../../../services/doll.service'
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    promotion: new FormControl(''),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });

  products: any
  @Input() itemid: any;
  @Output() messageEvent = new EventEmitter<string>();

  previewLoaded: boolean = false;
  promotions: any;

  //=========== theme mode =========
  themeColor!: string;
  lightColor: String = "rgb(220, 252, 230)";
  darkColor: String = "rgb(63,71,66)";

  fontColor!: String;
  bgColor!: String;

  constructor(private ps: DollService, private promotionservice: PromotionService, private DollService: DollService) {
    this.loadpromotion()
    this.onLoadingProduct()
  }

  ngOnInit(): void {
    this.themeColor = 'light';
    this.fontColor = this.darkColor;
    this.bgColor = this.lightColor;
  }

  changeTheme(theme: string) {
    if (theme == 'light') {
      this.fontColor = this.darkColor;
      this.bgColor = this.lightColor;
      console.log("Edit is light!")
    }
    else if (theme == 'dark') {
      this.fontColor = this.lightColor;
      this.bgColor = this.darkColor;
      console.log("Edit is dark!")
    }
    this.themeColor = theme;
  }

  UpdateProduct() {
    this.ps.updateDoll(this.itemid).subscribe(
      data => {
        console.log(data)
        alert('Product updated successfully');
        this.productForm.reset();
        this.messageEvent.emit(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('Invalid format');
        this.productForm.reset();
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.productForm.patchValue({
            img: reader.result?.toString()
          });
        };
      }
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

  onLoadingProduct() {
    try {
      this.DollService.getProducts().subscribe(
        data => {
          this.products = data;
          console.log(data)
        },
        err => {
          console.log(err)
        });
    } catch (error) {
      console.log(error)
    }
  }


  resetForm() {
    this.productForm.reset();
    this.previewLoaded = false;
  }

}
