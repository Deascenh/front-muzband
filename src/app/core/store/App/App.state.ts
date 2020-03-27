import {RouterReducerState} from '@ngrx/router-store';
import {IUserState, initialUserState} from '../user/user.state';
import {IConfigState, initialConfigState} from '../Config/Config.state';
import {IAuthState, initialAuthState} from '../auth/auth.state';
import {IMusicState, initialMusicState} from '../music/music.state';
import {IInstrumentState, initialInstrumentState} from '../instrument/instrument.state';

export interface IAppState {
  router?: RouterReducerState;
  config: IConfigState;
  auth: IAuthState;
  users: IUserState;
  musics: IMusicState;
  instruments: IInstrumentState;
}

export const initialAppState: IAppState = {
  config: initialConfigState,
  auth: initialAuthState,
  users: initialUserState,
  musics: initialMusicState,
  instruments: initialInstrumentState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
