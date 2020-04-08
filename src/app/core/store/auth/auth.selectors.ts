import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IAuthState} from './auth.state';
import {IAppState} from '../App/App.state';

const authState = (state: IAppState) => state.auth;

export const selectAuthState = createFeatureSelector<IAuthState>('auth');

export const selectAuthenticatedUser = createSelector(
  authState,
  (state: IAuthState) => state.user,
);

export const selectSessionTimeout = createSelector(
  authState,
  (state: IAuthState) => state.sessionTimeout
);
