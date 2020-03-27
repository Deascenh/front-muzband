import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {InstrumentService} from '../../data/instrument.service';
import {EInstrumentActions, GetInstruments, GetInstrumentsSuccess} from './instrument.actions';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Instrument} from '../../models';

@Injectable()
export class InstrumentEffects {

  @Effect()
  getInstruments$ = this.actions$.pipe(
    ofType<GetInstruments>(EInstrumentActions.GetInstruments),
    switchMap(() => this.instrumentService.getAll()),
    map(data => data['hydra:member']),
    switchMap((users: Instrument[]) => of(new GetInstrumentsSuccess(users)))
  );

  constructor(
    private instrumentService: InstrumentService,
    private actions$: Actions,
  ) {}
}
