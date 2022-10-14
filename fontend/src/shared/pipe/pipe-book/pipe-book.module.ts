import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdToNameBookPipe } from './id-to-name-book.pipe';



@NgModule({
  declarations: [
    IdToNameBookPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    IdToNameBookPipe
  ]
})
export class PipeBookModule { }
