import {initialUserState, IUserState} from './user.state';
import {EUserActions, UserActions} from './user.actions';

export function userReducers(
  state: IUserState = initialUserState,
  action: UserActions,
): IUserState {
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
    case EUserActions.AppendToUsers: {
      const users = state.users.filter(user =>
        user['@id'] !== action.payload['@id'],
      );
      return {
        ...state,
        users: [...users, action.payload],
      };
    }
    case EUserActions.RemoveUser: {
      return {
        ...state,
        users: state.users.filter(user => user['@id'] !== action.payload['@id']),
      };
    }
    default: {
      return state;
    }
  }
}

