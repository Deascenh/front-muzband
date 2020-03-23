import {ActionReducer, MetaReducer} from '@ngrx/store';
import {localStorageSync} from 'ngrx-store-localstorage';

export const STORES_TO_PERSIST = ['auth', 'config'];

/**
 * Used in : app/core/core.module
 * @param reducer
 */
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: STORES_TO_PERSIST,
    rehydrate: true,
  })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
