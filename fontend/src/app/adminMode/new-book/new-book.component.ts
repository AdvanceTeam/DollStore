import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  productType: String[] = ['นิยาย', 'สารคดี', 'ภาษาต่างประเทศ', 'การ์ตูน'];
  previewLoaded: boolean = false;

  productForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    author : new FormControl('',[Validators.required]),
    tag: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    file: new FormControl('',),
    img: new FormControl('',[Validators.required]),
  })

  constructor(private bookservice:BookService) { }

  ngOnInit(): void {
  }

  onChangeImg(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded= true;
        this.productForm.patchValue({
          img: reader.result
        })
      }
    }
  }

  addProduct(){
    console.log(this.productForm.value);
    this.bookservice.addProduct(this.productForm.value).subscribe(
      data => {
        console.log();
        alert('หนังสือถูกเพิ่มแล้ว!!!')
        this.productForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm(){
    this.productForm.reset();
    this.previewLoaded = false;
  }

  get validateName() { return this.productForm.get('name') as FormControl }
  get validateTag() { return this.productForm.get('tag') as FormControl }
  get validateQuantity() { return this.productForm.get('quantity') as FormControl }
  get validatePrice() { return this.productForm.get('price') as FormControl }
  get validateImg() { return this.productForm.get('img') as FormControl }
  get validateauthor() { return this.productForm.get('author') as FormControl }

}
