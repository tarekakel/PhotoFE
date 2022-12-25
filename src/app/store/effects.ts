import { Injectable } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as photoActions from './actions'
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class PhotoEffects {
  constructor(private actions$: Actions, private photoService: PhotoService) {

  }


  photoList$ = createEffect(() =>
    this.actions$.pipe(ofType(photoActions.getPhotoListAction),

      switchMap((req: any) => {
        return this.photoService.getPhotoList(req.payload)
          .pipe(map((resp: any) => photoActions.getPhotoListSuccessAction(resp),), catchError((resp: any) => of(photoActions.getPhotoFailedAction(resp))),)
      })));
}

