import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './middleware/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './core/guard/auth-guard';
import {MusicComponent} from './music/music.component';
import {ContentNotFoundComponent} from './shared/components/content-not-found/content-not-found.component';

export const ROUTED_APP_COMPONENTS = [
  LoginComponent,
  HomeComponent,
  MusicComponent,
];

const routes: Routes = [
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
  {
    path: 'content-not-found-404',
    component: ContentNotFoundComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
