import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination, PAGING_OPTIONS } from 'src/app/models/paging';
import { State } from 'src/app/store/state';
import * as photoActions from '../../store/actions'
import { ActivatedRoute, Router } from '@angular/router';
import { selectPhotoList } from 'src/app/store/reducers';
import * as storage from '../../store/storage';
@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent implements OnInit {
  pagination: Pagination = PAGING_OPTIONS;
  photos: any | undefined;
  constructor(private store: Store<State>, private route: ActivatedRoute,
    private router: Router) { }
  photoList$: Observable<any> | undefined;
  ngOnInit(): void {
    if (localStorage.getItem('Paging')) {
      this.pagination = JSON.parse(localStorage.getItem('Paging')!.toString());
    }
    if (!storage.getItem('photo')?.data) {
      this.store.dispatch(photoActions.getPhotoListAction({ payload: { Rows: this.pagination.pageSize, First: ((this.pagination.page - 1) * this.pagination.pageSize) } }));
    }

    this.getPhotoList();
  }

  onPageChange(event: any) {
    this.pagination.page = event;
    this.store.dispatch(photoActions.getPhotoListAction({ payload: { Rows: this.pagination.pageSize, First: ((this.pagination.page - 1) * this.pagination.pageSize) } }));
    this.getPhotoList();
  }

  onPageSizeChange(event: any) {
    this.store.dispatch(photoActions.getPhotoListAction({ payload: { Rows: this.pagination.pageSize, First: ((this.pagination.page - 1) * this.pagination.pageSize) } }));

    this.pagination.pageSize = event.target.value;
    this.pagination.page = 1;
    this.getPhotoList();
  }
  getPhotoList() {
    this.photoList$ = this.store.pipe(select(selectPhotoList));
    this.photoList$.subscribe(res => {
      if (res && res?.photo?.data?.data?.length > 0) {
        this.photos = res?.photo?.data?.data; this.pagination.count = res.photo?.data?.total
      };
      localStorage.setItem('Paging', JSON.stringify(this.pagination));
      this.pagination = JSON.parse(localStorage.getItem('Paging')!.toString());
    })
  }
  navigateToDetails(ph: any) {
    this.router.navigate(['/photo-details']);
    if (localStorage.getItem('photoItem') && JSON.parse(localStorage.getItem('photoItem')!).id != ph.id) {
      localStorage.removeItem('img');
    }
    localStorage.setItem('photoItem', JSON.stringify(ph));

  }
}
