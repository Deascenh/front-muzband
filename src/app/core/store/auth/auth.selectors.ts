import {createFeatureSelector} from '@ngrx/store';
import {IAppState} from '../App/App.state';
import {IAuthState} from './auth.state';

export const selectAuthState = createFeatureSelector<IAuthState>('auth');
