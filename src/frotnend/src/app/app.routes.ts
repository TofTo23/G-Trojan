import { Routes } from '@angular/router';
import { PlacesList } from './places-list/places-list';
import { BlogList } from './blog-list/blog-list';
import { Login } from './login/login'; // Dodany import

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
    path: 'login', // Dodana trasa
    component: Login,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'places',
  },
];