import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/navbar/admin/admin.component';
import { UserComponent } from './components/navbar/user/user.component';
import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { ManageproductComponent } from './components/adminMode/manageproduct/manageproduct.component';
import { ManagepromotionComponent } from './components/adminMode/managepromotion/managepromotion.component';
import { ShowproductComponent } from './components/userMode/showproduct/showproduct.component';

const routes: Routes = [
  {path: 'home1', component: AppComponent},
  {path: 'login', component: LoginComponent},
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
    {
      path: 'showproduct', component: ShowproductComponent
    },

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
