import {IConfig} from '../../models';

export interface IConfigState {
  config: IConfig;
}

export const initialConfigState: IConfigState = {
  config: null,
};
