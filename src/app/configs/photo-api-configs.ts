import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { PagingRequest } from '../models/paging';
@Injectable({ providedIn: 'root' })

export class PhotoAPIConfig {
  constructor() {

  }
  GET_PHOTO_LIST = (payload: PagingRequest): string => `${environment.BASE_API_URL}Photo?Rows=${payload.Rows}&First=${payload.First}`
  GET_IMAGE = (payload: string): string => `${environment.BASE_API_URL}Photo/GetImage/?url=${payload}`
  GET_PDF = (payload: any): string => `${environment.BASE_API_URL}Photo/GetTemplatPDf?ImagePath=${payload.ImagePath}&ContentTitle=${payload.ContentTitle}&ContentText=${payload.ContentText}&fontSize=${payload.fontSize}&type=${payload.type}`
  ADD_NEW_DOWNLOAD = (photoId: any, typeId: any) => `${environment.BASE_API_URL}Photo/add-new-download/${photoId}/${typeId}`
  GET_PHOTO_BY_ID = (photoId: any) => `${environment.BASE_API_URL}Photo/get-photo-by-id/${photoId}`
}
