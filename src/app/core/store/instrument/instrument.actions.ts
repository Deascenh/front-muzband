import {Action} from '@ngrx/store';
import {Instrument} from '../../models';

export enum EInstrumentActions {
  GetInstruments = '[Instrument] Get Instruments',
  GetInstrumentsSuccess = '[Instrument] Get Instruments Success',
}

export class GetInstruments implements Action {
  public readonly type = EInstrumentActions.GetInstruments;
}

export class GetInstrumentsSuccess implements Action {
  public readonly type = EInstrumentActions.GetInstrumentsSuccess;
  constructor(public payload: Instrument[]) {}
}

export type InstrumentActions =
  | GetInstruments
  | GetInstrumentsSuccess;
