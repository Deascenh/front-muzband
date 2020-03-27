import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './middleware/landing/landing.component';
import {LoginComponent} from './middleware/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './core/guard/auth-guard';
import {MusicComponent} from './music/music.component';

export const ROUTED_APP_COMPONENTS = [
  LandingComponent,
  LoginComponent,
  HomeComponent,
  MusicComponent,
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
    canActivate: [AuthGuard],
  },
  {
    path: 'music/:id',
    component: MusicComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
