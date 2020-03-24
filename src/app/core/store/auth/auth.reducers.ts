import {IAuthState, initialAuthState} from './auth.state';
import {AuthActions, EAuthActions} from './auth.actions';

export const authReducers = (
  state: IAuthState = initialAuthState,
  action: AuthActions,
): IAuthState => {
  switch (action.type) {
    case EAuthActions.LoginSuccess: {
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: null
      };
    }
    case EAuthActions.LoginFailure: {
      return {
        ...state,
        errorMessage: 'Oups ! Erreur d\'email et/ou de mot de passe.'
      };
    }
    case EAuthActions.FetchAuthenticatedUserSuccess: {
      return {
        ...state,
        user: action.payload
      };
    }
    case EAuthActions.Logout: {
      return initialAuthState;
    }
    default: {
      return state;
    }
  }
};
