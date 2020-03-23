import {RouterReducerState} from '@ngrx/router-store';
import {IUserState, initialUserState} from '../user/user.state';
import {IConfigState, initialConfigState} from '../Config/Config.state';
import {IAuthState, initialAuthState} from '../auth/auth.state';

export interface IAppState {
  router?: RouterReducerState;
  auth: IAuthState;
  users: IUserState;
  config: IConfigState;
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  users: initialUserState,
  config: initialConfigState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
