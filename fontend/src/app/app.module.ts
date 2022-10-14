import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {CanActivate} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { MainhomeComponent } from './mainhome/mainhome.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { NewBookComponent } from './adminMode/new-book/new-book.component';
import { StockComponent } from './adminMode/stock/stock.component';
import { EditQuantityComponent } from './adminMode/edit-quantity/edit-quantity.component';
import { ShowproductsComponent } from './userMode/showproducts/showproducts.component';
import { CartsComponent } from './userMode/carts/carts.component';
import { SearchComponent } from './userMode/search/search.component';
import { BuyProductsComponent } from './userMode/buy-products/buy-products.component';
import { DeleteCartComponent } from './userMode/delete-cart/delete-cart.component';
import { HomeComponent,TruncatePipe } from './adminMode/home/home.component';
import { ResetPasswordComponent } from './userMode/reset-password/reset-password.component';
import { ManageUserComponent } from './adminMode/manage-user/manage-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';  
import {MatButtonModule} from '@angular/material/button';
import { CartV2Component } from './cart-v2/cart-v2.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import { PipeBookModule } from 'src/shared/pipe/pipe-book/pipe-book.module';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    MainhomeComponent,
    NewBookComponent,
    StockComponent,
    EditQuantityComponent,
    ShowproductsComponent,
    CartsComponent,
    SearchComponent,
    BuyProductsComponent,
    DeleteCartComponent,
    HomeComponent,
    ResetPasswordComponent,
    ManageUserComponent,
    CartV2Component,
    TruncatePipe,
    
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
    PipeBookModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
