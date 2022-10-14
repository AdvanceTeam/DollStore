import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-delete-cart',
  templateUrl: './delete-cart.component.html',
  styleUrls: ['./delete-cart.component.css']
})
export class DeleteCartComponent implements OnInit {

  @Input() item: any;

  constructor(private cs:CartService) { }

  ngOnInit(): void {
  }

  deleteCart(){
    console.log("delete products on carts")
    this.cs.deleteFormCart(this.item)
  }

}
