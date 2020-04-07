import {IInstrumentState, initialInstrumentState} from './instrument.state';
import {EInstrumentActions, InstrumentActions} from './instrument.actions';

export function instrumentReducers(
  state: IInstrumentState = initialInstrumentState,
  action: InstrumentActions,
): IInstrumentState {
  switch (action.type) {
    case EInstrumentActions.GetInstrumentsSuccess: {
      return {
        ...state,
        instruments: action.payload
      };
    }
    case EInstrumentActions.AppendToInstruments: {
      const instruments = state.instruments.filter(
        instrument => instrument['@id'] !== action.payload['@id']
      );
      return {
        ...state,
        instruments: [...instruments, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

