import {initialUserState, IUserState} from './user.state';
import {EUserActions, UserActions} from './user.actions';

export const userReducers = (
  state: IUserState = initialUserState,
  action: UserActions,
): IUserState => {
  switch (action.type) {
    case EUserActions.GetUsersSuccess: {
      return {
        ...state,
        users: action.payload
      };
    }
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        selectedUser: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

