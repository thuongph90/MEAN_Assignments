import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { ErrorComponent } from './error/error.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'new',component: NewComponent },
  { path: 'detail/:id',component: DetailComponent },
  { path: 'edit/:id',component: EditComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent },

  // { path: '', pathMatch: 'full', redirectTo: '/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
