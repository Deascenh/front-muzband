import {IAppState} from './App.state';
import {createSelector} from '@ngrx/store';

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

