import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IAppState} from '../App/App.state';
import {IMusicState} from './music.state';

const musicsState = (state: IAppState) => state.musics;

export const selectMusics = createFeatureSelector<IMusicState>('music');

export const selectSidenavMusics = createSelector(
  musicsState,
  (state: IMusicState) => state.sidenavMusics,
);

export const selectFocusedMusic = createSelector(
  musicsState,
  (state: IMusicState) => state.focus,
);
