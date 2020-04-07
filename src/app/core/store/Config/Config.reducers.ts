import {IConfigState, initialConfigState} from './Config.state';
import {ConfigActions, EConfigActions} from './Config.actions';

export function configReducers(
  state: IConfigState = initialConfigState,
  action: ConfigActions,
): IConfigState {
  switch (action.type) {
    case EConfigActions.GetConfigSuccess: {
      return {
        ...state,
        config: action.payload
      };
    }
    default:
      return state;
  }
}
