import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './middleware/landing/landing.component';
import {LoginComponent} from './middleware/login/login.component';
import {HomeComponent} from './home/home.component';

export const ROUTED_COMPONENTS = [
  LandingComponent,
  LoginComponent,
  HomeComponent,
];

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '', component: LandingComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
