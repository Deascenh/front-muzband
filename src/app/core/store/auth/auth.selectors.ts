import {createFeatureSelector} from '@ngrx/store';
import {IAuthState} from './auth.state';

export const selectAuthState = createFeatureSelector<IAuthState>('auth');
