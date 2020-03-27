import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IAppState} from '../App/App.state';
import {IInstrumentState} from './instrument.state';

const instrumentsState = (state: IAppState) => state.instruments;

export const selectInstruments = createFeatureSelector<IAppState>('instruments');

export const selectInstrumentList = createSelector(
  instrumentsState,
  (state: IInstrumentState) => state.instruments,
);
