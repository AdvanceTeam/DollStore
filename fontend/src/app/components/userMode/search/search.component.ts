import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { DollService } from 'src/app/services/doll.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
    
  search: any;
  status!: boolean;
  // keyword = new FormControl('');
  help!: number;
  @Output() messageEvent = new EventEmitter<any>();
  
  constructor(private ps: DollService) { 
    this.onLoading();
    
  }

  ngOnInit(): void {
  this.status = false;
}
  
  onLoading(){
    try{
      this.ps.getProducts().subscribe(
        data => {
          this.search = data
          this.toProduct(this.search)
        },
        err => {
          console.log(err)
        });
    }catch(error){
      console.log(error)
    }
  }
  // onSearch2(keyword:any){
  //   try {
  //     this.ps.getBySearch(keyword).subscribe( //การเรียกใช้ตัว product
  //       data => {
  //         this.search = data;
  //         this.toProduct(this.search)
  //     },
  //       err => {
  //         console.log(err)
  //       });
  //   }catch (error) {
  //     console.log(error)
  //   }
  // }

  // onSearch1(){
  //   if(this.keyword.value == ''){
  //     this.onLoading();
  //     console.log('1')
  //   }
  //   else{
  //     this.onSearch2(this.keyword.value);
  //   }
  // }
  ngClassMethod(){
    this.status = !this.status;
  }

  toProduct(item:any){
    this.messageEvent.emit(this.search)
    console.log(this.search)
  }
}
