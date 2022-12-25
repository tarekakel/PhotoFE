import { Action, createAction, props } from "@ngrx/store";

export const getPhotoListAction = createAction('[GETPHOTOLIST] Get Photo List Action', props<{ payload: any }>());
export const getPhotoListSuccessAction = createAction('[GETPHOTOLISTSUCCESS] Get Photo List Action Success', props<{ response: any }>());
export const getPhotoFailedAction = createAction('[GETPHOTOLISTFAILED] Get Photo List Action Failed', props<{ response: any }>());
