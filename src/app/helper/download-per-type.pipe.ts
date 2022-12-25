import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../models/models';

@Pipe({
  name: 'downloadPerType'
})
export class DownloadPerTypePipe implements PipeTransform {
  transform(photo: Photo, params: any): any {
    if (params.field && params.field == 'total') {
      var res = photo.photoDownloadTypes.map(x => `${x.total} as ${x.downloadType?.typeName} downloads`);
      return res?.length > 0 ? res : 'No downloads yet';
    }
    else if (params == 'details') {
      let dictionary = Object.assign({}, ...photo.photoDownloadTypes.map((x) => ({ [x.downloadType?.typeName]: x.total ?? 0 })));

      return dictionary;
    };
  }
}
