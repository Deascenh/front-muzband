import {Action} from '@ngrx/store';
import {User} from '../../models';

export enum EAuthActions {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  FetchAuthenticatedUser = '[Auth] Fetch Authenticated User',
  FetchAuthenticatedUserSuccess = '[Auth] Fetch Authenticated User Success',
  Logout = '[Auth] Logout'
}

export class Login implements Action {
  readonly type = EAuthActions.Login;
  constructor(public payload: {username: string, password: string}) {}
}

export class LoginSuccess implements Action {
  readonly type = EAuthActions.LoginSuccess;
  constructor(public payload: { token: string }) {}
}

export class LoginFailure implements Action {
  readonly type = EAuthActions.LoginFailure;
  constructor(public payload: any) {}
}

export class FetchAuthenticatedUser implements Action {
  readonly type = EAuthActions.FetchAuthenticatedUser;
  constructor(public payload: string) {}
}

export class FetchAuthenticatedUserSuccess implements Action {
  readonly type = EAuthActions.FetchAuthenticatedUserSuccess;
  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = EAuthActions.Logout;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | FetchAuthenticatedUser
  | FetchAuthenticatedUserSuccess
  | Logout;
