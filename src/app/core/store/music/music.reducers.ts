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
        musics: action.payload,
      };
    }
    case EMusicActions.GetFocusedMusicSuccess: {
      console.log(state.focus);
      const previous = state.focus ? new Music(state.focus) : initialMusicState.previous;
      const focus = new Music(action.payload.music);
      focus.musicians = [...action.payload.musicians] as Musician[];

      return {
        ...state,
        focus,
        previous,
      };
    }
    case EMusicActions.AddMusicSuccess: {
      return {
        ...state,
        musics: [...state.musics, action.payload],
        focus: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

