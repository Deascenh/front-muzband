import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IAppState} from '../App/App.state';
import {IInstrumentState} from './instrument.state';
import {Instrument} from '../../models';

const instrumentsState = (state: IAppState) => state.instruments;

export const selectInstruments = createFeatureSelector<IAppState>('instruments');

export const selectInstrumentList = createSelector(
  instrumentsState,
  (state: IInstrumentState) => state.instruments,
);

export const selectMenuInstrumentList = createSelector(
  instrumentsState,
  (state: IInstrumentState) => {
    return state.instruments.slice().sort((
      a: Instrument,
      b: Instrument
    ) => a.name.localeCompare(b.name));
  },
);
