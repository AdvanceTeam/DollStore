import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BookService } from '../../../services/book.service'

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {

  productName: string[] = ['Pikachu','Charmender','Eevee'];

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    promotion: new FormControl(''),
    file: new FormControl('', [Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private ps: BookService) { }

  ngOnInit(): void {
  }

  DeleteProduct() {
    this.ps.deleteProduct(this.productForm.value).subscribe(
      data => {
        console.log(data)
        alert('Product updated successfully');
        this.productForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }


}
