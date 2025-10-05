import { Routes } from '@angular/router';
import { PlacesList } from './places-list/places-list';
import { BlogList } from './blog-list/blog-list';

export const routes: Routes = [
  {
    path: 'places',
    component: PlacesList,
  },
  {
    path: 'blogs',
    component: BlogList,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'places',
  },
];
