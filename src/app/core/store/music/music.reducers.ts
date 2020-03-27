import {IMusicState, initialMusicState} from './music.state';
import {EMusicActions, MusicActions} from './music.actions';
import {Music, Musician} from '../../models';

export const musicReducers = (
  state: IMusicState = initialMusicState,
  action: MusicActions,
): IMusicState => {
  switch (action.type) {
    case EMusicActions.GetSidenavMusicsSuccess: {
      return {
        ...state,
        sidenavMusics: action.payload,
      };
    }
    case EMusicActions.GetFocusedMusicSuccess: {
      const focus = { ...action.payload.music } as Music;
      focus.musicians = { ...action.payload.musicians } as Musician[];

      return {
        ...state,
        focus,
      };
    }
    case EMusicActions.AddMusicSuccess: {
      return {
        ...state,
        sidenavMusics: [...state.sidenavMusics, action.payload],
        focus: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

