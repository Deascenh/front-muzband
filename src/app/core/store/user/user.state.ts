import {User} from '../../models';

export interface IUserState {
  users: User[];
  selectedUser: User;
}

export const initialUserState: IUserState = {
  users: [],
  selectedUser: null,
};
