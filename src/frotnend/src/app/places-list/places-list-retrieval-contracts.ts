export interface PlacesListRetrievalContract {
  name: string;
  coordinates: Coordinate;
  description: string;
  imageUrl: string;
}

export interface Coordinate {
  lat: number;
  lgn: number;
}
