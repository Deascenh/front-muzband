import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IAppState} from '../App/App.state';
import {IMusicState} from './music.state';
import {Music} from '../../models';

const musicsState = (state: IAppState) => state.musics;

export const selectMusics = createFeatureSelector<IMusicState>('music');

export const selectSidenavMusics = createSelector(
  musicsState,
  (state: IMusicState) => {
    return state.musics.slice().sort((
      a: Music,
      b: Music
    ) => a.title.localeCompare(b.title));
  },
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
