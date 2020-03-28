import {Music} from '../../models';

export interface IMusicState {
  sidenavMusics: Music[];
  focus: Music;
}

export const initialMusicState: IMusicState = {
  sidenavMusics: [],
  focus: null,
};
