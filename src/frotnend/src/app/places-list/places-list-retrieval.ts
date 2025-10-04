import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PlacesListRetrievalContract } from './places-list-retrieval-contracts';

@Injectable({
  providedIn: 'root',
})
export class PlacesListRetrieval {
  private readonly http = inject(HttpClient);
  getPlacesByLatLgn(lat: number, lgn: number) {
    const params = new HttpParams().set('lat', lat).set('lgn', lgn);

    return this.http.get<PlacesListRetrievalContract[]>(
      'http://127.0.0.1:8000/places-api',
      { params }
    );
  }
}
