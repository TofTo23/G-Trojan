import { Routes } from '@angular/router';
import { PlacesList } from './places-list/places-list';

export const routes: Routes = [
  {
    path: 'places',
    component: PlacesList,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'places',
  },
];
