import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdToNameDollPipe } from './id-to-name-doll.pipe';



@NgModule({
  declarations: [
    IdToNameDollPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    IdToNameDollPipe
  ]
})
export class PipeDollModule { }
