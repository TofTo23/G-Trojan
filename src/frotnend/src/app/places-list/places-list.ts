import { Component, inject, OnInit } from '@angular/core';
import { PlacesListRetrieval } from './places-list-retrieval';
import { PlacesListRetrievalContract } from './places-list-retrieval-contracts';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-places-list',
  imports: [MatCardModule],
  templateUrl: './places-list.html',
})
export class PlacesList implements OnInit {
  protected latitude!: number;
  protected longitude!: number;
  protected places!: PlacesListRetrievalContract[];

  private readonly placesService = inject(PlacesListRetrieval);

  ngOnInit(): void {
    navigator.geolocation.watchPosition((pos) => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      this.placesService
        .getPlacesByLatLgn(this.latitude, this.longitude)
        .subscribe((data) => {
          this.places = data;
        });
    });
  }
}
