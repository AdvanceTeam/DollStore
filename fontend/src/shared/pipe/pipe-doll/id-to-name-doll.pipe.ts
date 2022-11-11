import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DollService } from 'src/app/services/doll.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Pipe({
  name: 'idToNameDoll'
})
export class IdToNameDollPipe implements PipeTransform {
  
  dataDoll!:[
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

  constructor(private http:HttpClient,private dollService:DollService) { 
    this.dollService.getProducts().subscribe(
      data =>{
        this.dataDoll = data
      },
      err =>{

      }
    )
  }

   transform(idDollHTML:String): Observable<string>  {
    console.log("transform working");
    return this.dollService.getProducts().pipe(
      map(data =>{
        for (let index = 0; index < data.length; index++) {
          if (idDollHTML == data[index]._id) {
            console.log(data[index].name);  
            return data[index].name
          }
        }
      })
    )
   
  }
    

}
