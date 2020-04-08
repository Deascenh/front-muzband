import {Action} from '@ngrx/store';
import {Instrument} from '../../models';

export enum EInstrumentActions {
  GetInstruments = '[Instrument] Get Instruments',
  GetInstrumentsSuccess = '[Instrument] Get Instruments Success',
  AppendToInstruments = '[Instrument] Append Instrument to instruments',
  RemoveInstrument = '[Instrument] Remove Instrument',
}

export class GetInstruments implements Action {
  public readonly type = EInstrumentActions.GetInstruments;
}

export class GetInstrumentsSuccess implements Action {
  public readonly type = EInstrumentActions.GetInstrumentsSuccess;
  constructor(public payload: Instrument[]) {}
}

export class AppendToInstruments implements Action {
  public readonly type = EInstrumentActions.AppendToInstruments;
  constructor(public payload: Instrument) {}
}

export class RemoveInstrument implements Action {
  public readonly type = EInstrumentActions.RemoveInstrument;
  constructor(public payload: Instrument) {}
}

export type InstrumentActions =
  | GetInstruments
  | GetInstrumentsSuccess
  | AppendToInstruments
  | RemoveInstrument;
