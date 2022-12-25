import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoEffects } from './store/effects';
import { DownloadPerTypePipe } from './helper/download-per-type.pipe';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { metaReducers, reducers } from './store/state';

@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    DownloadPerTypePipe,
    PhotoDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),

    EffectsModule.forRoot([PhotoEffects]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
