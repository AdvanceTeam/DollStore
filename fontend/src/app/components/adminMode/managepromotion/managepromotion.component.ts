import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PromotionService } from 'src/app/services/promotion.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-managepromotion',
  templateUrl: './managepromotion.component.html',
  styleUrls: ['./managepromotion.component.css']
})

export class ManagepromotionComponent implements OnInit {



  constructor(private _location: Location, private promotionservice: PromotionService) { }
  
  ngOnInit(): void {
  }
 

  promotionFrom = new FormGroup({
    name: new FormControl('',[Validators.required]),
    percent: new FormControl('',[Validators.required,Validators.max(100),Validators.min(1)]),
    timestart: new FormControl('',[Validators.required]),
    timestop: new FormControl('',[Validators.required]),

  })

  get name() {
    return this.promotionFrom.get('name');
  }

  get percent() {
    return this.promotionFrom.get('percent');

  }

  addpromotion(){
    this.promotionservice.addPromotion(this.promotionFrom.value).subscribe({
      next:data => {
        alert('Promotion added success');
        this.promotionFrom.reset()
      },
      error:err => {
        console.log(err)
      }
    })
  }


  

  backClicked() {
    this._location.back();
  }


  

}
