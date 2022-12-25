import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as storage from '../store/storage';
import { environment } from '../../environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as photoReducer from '../store/reducers'
export interface State {
  data: any,
}



const reducerKeys = ['photo'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: reducerKeys, rehydrate: true })(reducer);
}
export const initialState: State = {
  data: storage.getItem('photo'),
};
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<any> = {
  photo: photoReducer.PhotoReducer,
};
export const metaReducers: MetaReducer<State>[] =
  !environment.production ? [debug, localStorageSyncReducer] : [localStorageSyncReducer];
