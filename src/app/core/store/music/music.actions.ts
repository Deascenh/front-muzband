import {Action} from '@ngrx/store';
import {Music, Musician} from '../../models';

export enum EMusicActions {
  GetSidenavMusics = '[Music] Get Sidenav Musics',
  GetSidenavMusicsSuccess = '[Music] Get Sidenav Musics Success',
  GetFocusedMusic = '[Music] Get Focused Music',
  GetFocusedMusicSuccess = '[Music] Get Focused Music Success',
  AddMusic = '[Music] Add Music',
  AddMusicSuccess = '[Music] Add Music Success',
  FocusMusic = '[Music] Focus Music',
  FocusMusicSuccess = '[Music] Focus Music Success',
}

export class GetSidenavMusics implements Action {
  public readonly type = EMusicActions.GetSidenavMusics;
}

export class GetSidenavMusicsSuccess implements Action {
  public readonly type = EMusicActions.GetSidenavMusicsSuccess;
  constructor(public payload: Music[]) {}
}

export class GetFocusedMusic implements Action {
  public readonly type = EMusicActions.GetFocusedMusic;
  constructor(public payload: number | string) {}
}

export class GetFocusedMusicSuccess implements Action {
  public readonly type = EMusicActions.GetFocusedMusicSuccess;
  constructor(public payload: {
    music: Music,
    musicians: Musician[],
  }) {}
}

export class AddMusic implements Action {
  public readonly type = EMusicActions.AddMusic;
  constructor(public payload: Music) {}
}

export class AddMusicSuccess implements Action {
  public readonly type = EMusicActions.AddMusicSuccess;
  constructor(public payload: Music) {}
}

export type MusicActions =
  | GetSidenavMusics
  | GetSidenavMusicsSuccess
  | GetFocusedMusic
  | GetFocusedMusicSuccess
  | AddMusic
  | AddMusicSuccess;
