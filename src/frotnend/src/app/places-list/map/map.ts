import { Component, Input, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapComponent implements AfterViewInit {
  @Input() origin!: { lat: number; lng: number };
  @Input() destination!: { lat: number; lng: number };

  private map!: L.Map;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // naprawa domyślnych ikon Leaflet
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'marker-icon-2x.png',
      iconUrl: 'marker-icon.png',
      shadowUrl: 'marker-shadow.png',
    });

    // inicjalizacja mapy
    this.map = L.map('map', {
      center: [this.origin.lat, this.origin.lng],
      zoom: 13,
    });

    setTimeout(() => {
      this.map.invalidateSize(); // wymusza poprawne rozciągnięcie kafelków
    }, 100);

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }
    ).addTo(this.map);

    // markery start / meta
    L.marker([this.origin.lat, this.origin.lng]).addTo(this.map);
    L.marker([this.destination.lat, this.destination.lng]).addTo(this.map);

    this.drawRoute();
  }

  private drawRoute(): void {
    const apiKey =
      'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjczMDY2NzgwZjA0NjRiNTFiZDhiMjE2MjAzNDViNmEyIiwiaCI6Im11cm11cjY0In0='; // Twój klucz ORS
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${this.origin.lng},${this.origin.lat}&end=${this.destination.lng},${this.destination.lat}`;

    this.http.get<any>(url).subscribe((res) => {
      const coords = res.features[0].geometry.coordinates.map((c: any) => [
        c[1],
        c[0],
      ]);
      const route = L.polyline(coords, { color: 'purple', weight: 5 }).addTo(
        this.map
      );
      this.map.fitBounds(route.getBounds());
    });
  }
}
