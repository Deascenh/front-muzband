import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AddMusic, AddMusicSuccess,
  EMusicActions, GetFocusedMusic,
  GetFocusedMusicSuccess,
  GetSidenavMusics, GetSidenavMusicsSuccess,
} from './music.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {forkJoin, Observable, of} from 'rxjs';
import {Music} from '../../models';
import {MusicService} from '../../data/music.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {manipulatedMusics} from './music.selectors';
import {IAppState} from '../App/App.state';

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
    withLatestFrom(this.store.pipe(select(manipulatedMusics))),
    switchMap(([id, manipulated]) => this.handleManipulatedMusics(id as number, manipulated)),
    switchMap(([music, musicians]) => {
      console.log('To set as focused', [music, musicians]);
      return of(new GetFocusedMusicSuccess({
        music: music as Music,
        musicians: musicians['hydra:member'] ? musicians['hydra:member'] : musicians,
      }));
    }),
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
    private store: Store<IAppState>,
  ) {}

  /**
   * Prevents overkill Server calls by checking if needed
   * music reference is already in the Store.
   *
   * @param id
   * @param manipulated
   */
  private handleManipulatedMusics(
    id: number,
    manipulated: { focus: Music, previous: Music }
    ): Observable<any[]> {
    const previous = manipulated.previous;
    const focus = manipulated.focus;
    if (focus && focus.id === id) {
      return of([focus, [...focus.musicians]]);
    } else if (previous && previous.id === id) {
      return of([previous, [...previous.musicians]]);
    } else {
      return forkJoin(this.musicService.get(id), this.musicService.getMusicians(id));
    }
  }
}
