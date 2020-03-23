import {createFeatureSelector} from '@ngrx/store';
import {IAppState} from '../App/App.state';

export const selectAuthState = createFeatureSelector<IAppState>('auth');
