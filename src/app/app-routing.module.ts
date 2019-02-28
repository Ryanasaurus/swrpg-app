import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { RacesComponent } from './races/races.component';
import { BrowseComponent } from './browse/browse.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'browse/races',
    component: BrowseComponent,
  },
  {
    path: 'browse/specs',
    component: BrowseComponent,
  },
  {
    path: 'races/:raceName',
    component: RacesComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
