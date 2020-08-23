import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [

  {path:'login',component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: 'logout', component: LogoutComponent}

];


@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, LogoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), FormsModule
  ]
})
export class AuthModule { }
