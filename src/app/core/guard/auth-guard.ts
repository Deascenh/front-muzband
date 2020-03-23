import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild,
} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/App/App.state';
import {Logout} from '../store/auth/auth.actions';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(public jwtService: JwtHelperService, public store: Store<IAppState>) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.authorizationAction();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authorizationAction();
  }

  private authorizationAction(): boolean {
    if (this.jwtService.isTokenExpired()) {
      this.store.dispatch(new Logout());
      return false;
    }
    return true;
  }
}
