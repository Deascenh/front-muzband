import {IMusicState, initialMusicState} from './music.state';
import {EMusicActions, MusicActions} from './music.actions';
import {Music, Musician} from '../../models';

export function musicReducers(
  state: IMusicState = initialMusicState,
  action: MusicActions,
): IMusicState {
  switch (action.type) {
    case EMusicActions.GetSidenavMusicsSuccess: {
      return {
        ...state,
        musics: action.payload,
      };
    }
    case EMusicActions.GetFocusedMusicSuccess: {
      const previous = state.focus ? new Music(state.focus) : initialMusicState.previous;
      const focus = new Music(action.payload.music);
      focus.musicians = [...action.payload.musicians] as Musician[];

      return {
        ...state,
        focus,
        previous,
      };
    }
    case EMusicActions.AddMusic: {
      return {
        ...state,
        musics: [...state.musics, action.payload],
        focus: action.payload,
      };
    }
    case EMusicActions.RemoveMusic: {
      return {
        ...state,
        musics: state.musics.filter(music => music['@id'] !== action.payload['@id']),
        focus: state.focus['@id'] === action.payload['@id'] ? null : state.focus,
        previous: state.previous['@id'] === action.payload['@id'] ? null : state.previous,
      };
    }
    case EMusicActions.AttachMusician: {
      const focus = new Music(state.focus);
      (focus.musicians as Musician[]).push(action.payload);
      return {
        ...state,
        focus,
      };
    }
    case EMusicActions.DetachMusician: {
      const focus = new Music(state.focus);
      focus.musicians = (focus.musicians as Musician[])
        .filter((musician: Musician) => musician['@id'] !== action.payload['@id']);
      return {
        ...state,
        focus,
      };
    }
    default: {
      return state;
    }
  }
};

