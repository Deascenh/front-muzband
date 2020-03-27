import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {IAppState} from '../App/App.state';
import {
  AddMusic, AddMusicSuccess,
  EMusicActions, FocusMusic, GetFocusedMusic,
  GetFocusedMusicSuccess,
  GetSidenavMusics, GetSidenavMusicsSuccess,
} from './music.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Music} from '../../models';
import {MusicService} from '../../data/music.service';
import {Router} from '@angular/router';

@Injectable()
export class MusicEffects {

  @Effect()
  getSidenavMusics$ = this.actions$.pipe(
    ofType<GetSidenavMusics>(EMusicActions.GetSidenavMusics),
    switchMap(() => this.musicService.getAll()),
    map(data => data['hydra:member']),
    switchMap((musics: Music[]) => of(new GetSidenavMusicsSuccess(musics)))
  );

  @Effect()
  getFocusedMusic$ = this.actions$.pipe(
    ofType<GetFocusedMusic>(EMusicActions.GetFocusedMusic),
    map(action => action.payload),
    switchMap((id: number | string) => this.musicService.get(id)),
    switchMap((music: Music) => of(new GetFocusedMusicSuccess(music)))
  );

  @Effect()
  addMucic$ = this.actions$.pipe(
    ofType<AddMusic>(EMusicActions.AddMusic),
    map(action => action.payload),
    switchMap(submit => this.musicService.save(submit)),
    switchMap((music: Music) => of(new AddMusicSuccess(music)))
  );

  @Effect({dispatch: false})
  addMucicSuccess$ = this.actions$.pipe(
    ofType<AddMusicSuccess>(EMusicActions.AddMusicSuccess),
    map(action => action.payload),
    tap(music => this.router.navigate(['music', music.id]))
  );

  @Effect()
  focusMusic$ = this.actions$.pipe(
    ofType<FocusMusic>(EMusicActions.FocusMusic),
    map(action => action.payload),
    switchMap(id => (this.musicService.get(id))),
    switchMap((music: Music) => of(new GetFocusedMusicSuccess(music)))
  );

  constructor(
    private musicService: MusicService,
    private router: Router,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}
}
