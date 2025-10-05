import { Component, inject, OnInit } from '@angular/core';
import { PlacesListRetrieval } from './places-list-retrieval';
import { PlacesListRetrievalContract } from './places-list-retrieval-contracts';
import { MatCardModule } from '@angular/material/card';
import { MapComponent } from './map/map';
import { mockData } from './places-list-retrieval-mock';

@Component({
  selector: 'app-places-list',
  imports: [MatCardModule, MapComponent],
  templateUrl: './places-list.html',
  styleUrl: './places-list.css',
})
export class PlacesList implements OnInit {
  protected latitude!: number;
  protected longitude!: number;
  protected places!: PlacesListRetrievalContract[];

  private readonly placesService = inject(PlacesListRetrieval);

  ngOnInit(): void {
    // navigator.geolocation.watchPosition((pos) => {
    //   this.latitude = pos.coords.latitude;
    //   this.longitude = pos.coords.longitude;
    //   this.placesService
    //     .getPlacesByLatLgn(this.latitude, this.longitude)
    //     .subscribe((data) => {
    //       this.places = data;
    //     });
    // });
    this.places = mockData;
  }
}
