import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/navbar/admin/admin.component';
import { UserComponent } from './components/navbar/user/user.component';
import {CanActivate} from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';  
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import { PipeDollModule } from 'src/shared/pipe/pipe-doll/pipe-doll.module';
import { ManageproductComponent } from './components/adminMode/manageproduct/manageproduct.component';
import { ManagepromotionComponent } from './components/adminMode/managepromotion/managepromotion.component';
import { ShowproductsComponent } from './components/userMode/showproducts/showproducts.component';
import { AddproductComponent } from './components/adminMode/addproduct/addproduct.component';
import { EditproductComponent } from './components/adminMode/editproduct/editproduct.component';
import { DeleteproductComponent } from './components/adminMode/deleteproduct/deleteproduct.component';
import { ListproductComponent } from './components/userMode/listproduct/listproduct.component';
import { DetailComponent } from './components/userMode/detail/detail.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchComponent } from './components/userMode/search/search.component';






@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    ManagepromotionComponent,
    ManageproductComponent,
    ShowproductsComponent,
    AddproductComponent,
    EditproductComponent,
    DeleteproductComponent,
    ListproductComponent,
    DetailComponent,
    SearchComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, FormsModule,
    HttpClientModule,
    AngularWebStorageModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatTabsModule,
    PipeDollModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,    
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
