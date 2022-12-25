import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PhotoAPIConfig } from '../configs/photo-api-configs';
import { PagingRequest } from '../models/paging';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient, private api: PhotoAPIConfig) { }


  getPhotoList(payload: PagingRequest) {
    return this.http.get(this.api.GET_PHOTO_LIST(payload),);
  }
  addNewDownload(photoId: any, typeId: any) {
    return this.http.post(this.api.ADD_NEW_DOWNLOAD(photoId, typeId), {})
  }

  getImage(payload: string) {
    return this.http.get(this.api.GET_IMAGE(payload), { responseType: 'blob' });
  }
  getWebPdf(payload: any) {
    return this.http.get(this.api.GET_PDF(payload), {
      headers: new HttpHeaders({ 'Accepted-Encoding': 'application/json' }),
      responseType: 'blob'
    })
  }
  getPhotoById(payload: string) {
    return this.http.get(this.api.GET_PHOTO_BY_ID(payload));
  }
}
