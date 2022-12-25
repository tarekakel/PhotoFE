import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PhotoService } from 'src/app/services/photo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DownloadPerTypePipe } from 'src/app/helper/download-per-type.pipe';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
  providers: [DownloadPerTypePipe],
})
export class PhotoDetailsComponent implements OnInit {
  photoItem: any;
  image: any;
  details: any;
  fontSize: any;
  load = false;
  constructor(private imgService: PhotoService, private sanitizer: DomSanitizer, private pipe: DownloadPerTypePipe) { }

  ngOnInit(): void {
    if (!localStorage.getItem('fontSize')) {
      this.fontSize = 20;
    }
    else {
      this.fontSize = Number(localStorage.getItem('fontSize'));
    }

    this.photoItem = JSON.parse(localStorage.getItem('photoItem')!.toString());
    if (!localStorage.getItem('img')) {
      this.imgService.getImage(this.photoItem.imagePath).subscribe(blob => {
        let objectURL = URL.createObjectURL(blob);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        localStorage.setItem('img', objectURL);
      })
    }
    else {
      this.image = this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem('img')!);
    }
    this.details = this.pipe.transform(this.photoItem, 'details');

  }
  toggle(size: any) {
    if (size == 'inc') {
      this.fontSize += 5;
    }
    else {
      this.fontSize -= 5;
    }
    localStorage.setItem('fontSize', this.fontSize);
  }
  DownloadPdf(typeId: any, format: string) {
    this.load = true;
    this.imgService.addNewDownload(this.photoItem.id, typeId).subscribe(res => {

      if (this.photoItem.photoDownloadTypes.filter((x: any) => x.downloadType?.id == typeId)[0]) {
        this.photoItem.photoDownloadTypes.filter((x: any) => x.downloadType?.id == typeId)[0].total += 1;
      }
      else {
        this.imgService.getPhotoById(this.photoItem.id).subscribe(res => {
          this.photoItem = res;
          localStorage.setItem('photoItem', JSON.stringify(this.photoItem))
          this.details = this.pipe.transform(this.photoItem, 'details');
        })
      }

      localStorage.setItem('photoItem', JSON.stringify(this.photoItem))
      this.details = this.pipe.transform(this.photoItem, 'details');

      let payload = { ImagePath: this.photoItem.imagePath, ContentTitle: this.photoItem.contentTitle, ContentText: this.photoItem.contentText, fontSize: this.fontSize, type: format };
      this.imgService.getWebPdf(payload).subscribe(res => {
        let fileUrl = format != 'MobilePng' ? URL.createObjectURL(new Blob([res], { type: 'application/pdf' })) : URL.createObjectURL(new Blob([res], { type: 'image/png' }));
        let a = document.createElement('a');
        a.href = fileUrl;
        a.target = '_blank';
        a.download = format + format == 'MobilePng' ? '.png' : '.pdf';
        document.body.appendChild(a);
        fetch(fileUrl).then(function (res) { a.click() }).catch(function (error) { console.log(error) });
        document.body.removeChild(a);
        this.load = false
      })
    });

  }
}
