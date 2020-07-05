import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router,
} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Store} from '@ngrx/store';
import {PurgeAuth} from '../store/auth/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(
    public jwtService: JwtHelperService,
    public router: Router,
    public store: Store,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.authorizationAction();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authorizationAction();
  }

  private authorizationAction(): boolean {
    if (this.jwtService.isTokenExpired()) {
      this.store.dispatch(new PurgeAuth());
      return false;
    }
    return true;
  }
}
