import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  products: any;
  constructor(private AuthServiceService:AuthServiceService) { 
    this.onLoading();
  
  }

  ngOnInit(): void {
  }

  onLoading(){
    try {
      this.AuthServiceService.getUsersData().subscribe(
        data => {
          this.products = data.filter(this.checkRole);
        },
        err => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
      
    }
  }

  checkRole(obj:any){
    return obj.role === "customer";
  }

  deleteUser(item:any){
    console.log("กดdelete",item);
    
    try {
      this.AuthServiceService.deleteProduct(item).subscribe(
        data => {
          //this.products = data;
        },
        err => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
    this.onLoading();
  }
}
