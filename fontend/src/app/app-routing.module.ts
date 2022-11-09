import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/navbar/admin/admin.component';
import { UserComponent } from './components/navbar/user/user.component';
import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { ManageproductComponent } from './components/adminMode/manageproduct/manageproduct.component';
import { ManagepromotionComponent } from './components/adminMode/managepromotion/managepromotion.component';
import { ShowproductsComponent } from './components/userMode/showproducts/showproducts.component';
import { ListproductComponent } from './components/userMode/listproduct/listproduct.component';
import { SearchComponent } from './components/userMode/search/search.component';
import { DetailComponent} from './components/userMode/detail/detail.component';

const routes: Routes = [
  {path: 'home1', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'listproduct', component: ListproductComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
  data: {
    role: 'admin'
  }, children: [
    {
      path: 'manageproduct', component: ManageproductComponent
    },
    {
      path: 'managepromotion', component: ManagepromotionComponent
    },
  ]},
  
  {path: 'user',component:UserComponent, canActivate: [AuthGuard],
  data: {
    role: 'customer'
  }, children: [
    {path: 'showproduct', component: ShowproductsComponent,},
    {path: 'listproduct', component: ListproductComponent},
    {path: 'search', component:SearchComponent},
    {path: 'detail', component:DetailComponent}
    

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
