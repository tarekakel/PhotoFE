export class Photo {
  contentTitle: any;
  contentText: any
  imagePath: any;
  id: any;
  photoDownloadTypes: PhotoDownloadType[] = [];
}
export class PhotoDownloadType {
  total: any
  downloadType: DownloadType = new DownloadType();
}

export class DownloadType {
  typeName: any;
}
