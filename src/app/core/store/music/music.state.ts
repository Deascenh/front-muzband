import {Music} from '../../models';

export interface IMusicState {
  musics: Music[];
  focus: Music;
  previous: Music;
}

export const initialMusicState: IMusicState = {
  musics: [],
  focus: null,
  previous: null,
};
