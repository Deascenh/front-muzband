import {Action} from '@ngrx/store';
import {User} from '../../models';

export enum EUserActions {
  GetUsers = '[User] Get Users',
  GetUsersSuccess = '[User] Get Users Success',
  GetUser = '[User] Get User',
  GetUserSuccess = '[User] Get User Success',
  AppendToUsers = '[User] Append User to users',
  RemoveUser = '[User] Remove User',
}

export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
}

export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: User[]) {}
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
  constructor(public payload: string) {}
}

export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: User) {}
}

export class AppendToUsers implements Action {
  public readonly type = EUserActions.AppendToUsers;
  constructor(public payload: User) {}
}

export class RemoveUser implements Action {
  public readonly type = EUserActions.RemoveUser;
  constructor(public payload: User) {}
}

export type UserActions =
  | GetUsers
  | GetUsersSuccess
  | GetUser
  | GetUserSuccess
  | AppendToUsers
  | RemoveUser;
