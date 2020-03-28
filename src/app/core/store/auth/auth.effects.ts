import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {
  EAuthActions,
  FetchAuthenticatedUser,
  FetchAuthenticatedUserSuccess,
  Login,
  LoginFailure,
  LoginSuccess, StoreSessionTimeout
} from './auth.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {ApiService} from '../../utils/api.service';
import {UserService} from '../../data/user.service';

@Injectable()
export class AuthEffects {
  @Effect()
  Login$: Observable<any> = this.actions$.pipe(
    ofType<Login>(EAuthActions.Login),
    map(action => action.payload),
    switchMap(payload => this.apiService.post('login_check', {
      username: payload.username,
      password: payload.password,
    })),
    switchMap(result => result.token ? of(new LoginSuccess(result)) : of(new LoginFailure(result)))
  );

  @Effect()
  LoginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccess>(EAuthActions.LoginSuccess),
    map(action => action.payload),
    tap(payload => {
      localStorage.setItem('access_token', payload.token);
      this.router.navigateByUrl('/');
    }),
    switchMap(() => of(new StoreSessionTimeout(this.jwtService.getTokenExpirationDate()))),
  );

  @Effect({ dispatch: false })
  LoginFailure$: Observable<any> = this.actions$.pipe(
    ofType<LoginFailure>(EAuthActions.LoginFailure)
  );

  @Effect()
  FetchAuthenticatedUser$ = this.actions$.pipe(
    ofType<FetchAuthenticatedUser>(EAuthActions.FetchAuthenticatedUser),
    map(action => action.payload),
    switchMap(id => this.userService.get(id)),
    switchMap(user => of(new FetchAuthenticatedUserSuccess(user)))
  );

  @Effect({ dispatch: false })
  public Logout$: Observable<any> = this.actions$.pipe(
    ofType(EAuthActions.Logout),
    tap(() => {
      localStorage.removeItem('access_token');
      this.router.navigateByUrl('/login');
    })
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private userService: UserService,
    private jwtService: JwtHelperService,
    private router: Router,
  ) {}
}
