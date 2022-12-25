import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { initialState, State } from './state';
import * as photoActions from './actions'
import { AppState } from './selectors';

export const PhotoReducesCases = createReducer(
  initialState,
  on(photoActions.getPhotoListAction, (state) => ({ ...state, data: null, errors: null })),
  on(photoActions.getPhotoListSuccessAction, (state, resp) => ({ ...state, data: resp, errors: null })),
  on(photoActions.getPhotoListAction, (state, resp) => ({ ...state, data: null, errors: resp })),
)



export function PhotoReducer(state: State | undefined, action: Action): State {
  return PhotoReducesCases(state, action);
}


export const selectPhotoList = createSelector(
  AppState, (state: State) => (state && state ? state : null)
)




