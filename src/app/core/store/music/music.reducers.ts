import {IMusicState, initialMusicState} from './music.state';
import {EMusicActions, MusicActions} from './music.actions';

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
      return {
        ...state,
        focus: action.payload,
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

