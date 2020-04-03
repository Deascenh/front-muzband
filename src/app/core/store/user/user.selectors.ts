import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IAppState} from '../App/App.state';
import {IUserState} from './user.state';
import {User} from '../../models';

const usersState = (state: IAppState) => state.users;

export const selectUsers = createFeatureSelector<IUserState>('users');

export const selectUserList = createSelector(
  usersState,
  (state: IUserState) => state.users,
);

export const selectMenuUserList = createSelector(
  usersState,
  (state: IUserState) => {
    return state.users.slice().sort((
      a: User,
      b: User
    ) => a.useName().localeCompare(b.useName()));
  },
);

export const selectSelectedUser = createSelector(
  usersState,
  (state: IUserState) => state.selectedUser,
);
