import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IAppState} from '../App/App.state';
import {IMusicState} from './music.state';

const musicsState = (state: IAppState) => state.musics;

export const selectMusics = createFeatureSelector<IMusicState>('music');

export const selectSidenavMusics = createSelector(
  musicsState,
  (state: IMusicState) => state.musics,
);

export const focusedMusic = createSelector(
  musicsState,
  (state: IMusicState) => state.focus,
);

export const previousFocusedMusic = createSelector(
  musicsState,
  (state: IMusicState) => state.previous,
);

export const manipulatedMusics = createSelector(
  musicsState,
  (state: IMusicState) => {
    return {
      focus: state.focus,
      previous: state.previous,
    };
  },
);
