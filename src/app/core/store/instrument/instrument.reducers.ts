import {IInstrumentState, initialInstrumentState} from './instrument.state';
import {EInstrumentActions, InstrumentActions} from './instrument.actions';

export const instrumentReducers = (
  state: IInstrumentState = initialInstrumentState,
  action: InstrumentActions,
): IInstrumentState => {
  switch (action.type) {
    case EInstrumentActions.GetInstrumentsSuccess: {
      return {
        ...state,
        instruments: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

