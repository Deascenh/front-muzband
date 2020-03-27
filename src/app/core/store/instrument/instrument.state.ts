import {Instrument} from '../../models';

export interface IInstrumentState {
  instruments: Instrument[];
}

export const initialInstrumentState: IInstrumentState = {
  instruments: null,
};
