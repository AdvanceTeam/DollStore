import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PromotionService } from 'src/app/services/promotion.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};

@Component({
  selector: 'app-managepromotion',
  templateUrl: './managepromotion.component.html',
  styleUrls: ['./managepromotion.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class ManagepromotionComponent implements OnInit {


  promotions: any;
  constructor(private _location: Location, private promotionservice: PromotionService) {
    this.load()
   }



  ngOnInit(): void {

  }


  promotionFrom = new FormGroup({
    name: new FormControl('', [Validators.required]),
    percent: new FormControl('', [Validators.required, Validators.max(100), Validators.min(1)]),
    datestart: new FormControl('', [Validators.required]),
    datestop: new FormControl('', [Validators.required]),

  })




  get name() {
    return this.promotionFrom.get('name');
  }

  get percent() {
    return this.promotionFrom.get('percent');

  }

  addpromotion() {
    this.promotionservice.addPromotion(this.promotionFrom.value).subscribe({
      next: data => {
        alert('Promotion added success');
        this.promotionFrom.reset()
        this.load()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  load(){
    try{
      this.promotionservice.getPromotion().subscribe({
        next:data => {
          this.promotions = data;
          console.log(data)
        },
        error:err => {
          console.log(err);
        }
      })
    }catch(err){
      console.log(err);
    }
  }


  backClicked() {
    this._location.back();
  }




}
