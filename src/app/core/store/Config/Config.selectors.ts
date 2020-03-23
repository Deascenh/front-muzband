import {createSelector} from '@ngrx/store';
import {IConfigState} from './Config.state';
import {IAppState} from '../App/App.state';

const configState = (state: IAppState) => state.config;

export const selectConfig = createSelector(
  configState,
  (state: IConfigState) => state.config,
);
