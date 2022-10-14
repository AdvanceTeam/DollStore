import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component'
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component';
import { MainhomeComponent } from './mainhome/mainhome.component';
import { AuthGuard } from './auth.guard';
import { NewBookComponent } from './adminMode/new-book/new-book.component';
import { StockComponent } from './adminMode/stock/stock.component';
import { CartsComponent } from './userMode/carts/carts.component';
import { ShowproductsComponent } from './userMode/showproducts/showproducts.component';
import { SearchComponent } from './userMode/search/search.component';
import { HomeComponent } from './adminMode/home/home.component';
import { ResetPasswordComponent } from './userMode/reset-password/reset-password.component';
import { ManageUserComponent } from './adminMode/manage-user/manage-user.component';
const routes: Routes = [
  {path: 'home1', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
  data: {
    role: 'admin'
  }, children: [
    {
      path: 'newbook', component: NewBookComponent
    },{
      path: 'stock', component: StockComponent
    },{
      path: 'Home' , component: HomeComponent
    },
    {
      path: 'Manage', component: ManageUserComponent
    }
  ]},
  {path: 'user',component:ShowproductsComponent, canActivate: [AuthGuard],
  data: {
    role: 'customer'
  }, children: [
    {
      path: 'cart', component:CartsComponent
    },
    {
      path: 'products', component:ShowproductsComponent
    },
    {
      path: 'search', component:SearchComponent
    },{
      path: 'resetpassword', component:ResetPasswordComponent
    }
  ]},
  {path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
