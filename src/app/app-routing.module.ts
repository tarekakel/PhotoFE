import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';

const routes: Routes = [{ path: 'photo-details', component: PhotoDetailsComponent }, { path: '**', component: PhotoListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
