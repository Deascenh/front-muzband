import {IAppState} from './App.state';
import {createSelector} from '@ngrx/store';
import {selectInstrumentList} from '../instrument/instrument.selectors';
import {selectUserList} from '../user/user.selectors';
import {Instrument, User} from '../../models';

const routerState = (state: IAppState) => state.router;

export const selectRouter = createSelector(
  routerState,
  (state) => state,
);

export const selectAppRouter = createSelector(
  routerState,
  (state) => state ? {
    url: state.state.url,
    path: state.state.root.firstChild ? state.state.root.firstChild.routeConfig.path : null,
    params: state.state.root.firstChild ? state.state.root.firstChild.params : null,
  } : undefined,
);

// TODO Use this selector when/if header menus
//  shape be differentiated from raw resources
export const selectAppMenus = createSelector(
  selectInstrumentList,
  selectUserList,
  (instrumentsState: Instrument[], usersState: User[]) => {
    return {
      instrumentsMenu: instrumentsState,
      usersMenu: usersState,
    };
  }
);
