import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mockData } from './places-list-retrieval-mock';

@Injectable({
  providedIn: 'root',
})
export class PlacesListRetrieval {
  getPlacesByLatLgn(lat: number, lgn: number) {
    return of(mockData);
  }
}
