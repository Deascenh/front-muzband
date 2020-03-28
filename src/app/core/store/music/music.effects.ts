import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AddMusic, AddMusicSuccess,
  EMusicActions, GetFocusedMusic,
  GetFocusedMusicSuccess,
  GetSidenavMusics, GetSidenavMusicsSuccess,
} from './music.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
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
    switchMap(id => forkJoin(
      this.musicService.get(id),
      this.musicService.getMusicians(id),
    )),
    switchMap(([music, musicians]) => of(new GetFocusedMusicSuccess({
      music,
      musicians: musicians['hydra:member'],
    }))),
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

  constructor(
    private musicService: MusicService,
    private router: Router,
    private actions$: Actions,
  ) {}
}
