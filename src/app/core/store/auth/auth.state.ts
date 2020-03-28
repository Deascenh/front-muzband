import {User} from '../../models';

export interface IAuthState {
  isAuthenticated: boolean;
  sessionTimeout: string;
  user: User | null;
  errorMessage: string | null;
}

export const initialAuthState: IAuthState = {
  isAuthenticated: false,
  sessionTimeout: null,
  user: null,
  errorMessage: null
};
