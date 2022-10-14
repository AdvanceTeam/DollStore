import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/app/services/book.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Pipe({
  name: 'idToNameBook'
})
export class IdToNameBookPipe implements PipeTransform {
  
  dataBook!:[
    {
        _id: String,
        name: String,
        tag: String,
        quantity: Number,
        price: Number,
        file: String,
        img: String
    }
  ];

  constructor(private http:HttpClient,private bookService:BookService) { 
    this.bookService.getProducts().subscribe(
      data =>{
        this.dataBook = data
      },
      err =>{

      }
    )
  }

   transform(idBookHTML:String): Observable<string>  {
    console.log("transform working");
    return this.bookService.getProducts().pipe(
      map(data =>{
        for (let index = 0; index < data.length; index++) {
          if (idBookHTML == data[index]._id) {
            console.log(data[index].name);  
            return data[index].name
          }
        }
      })
    )
   
  }
    

}
