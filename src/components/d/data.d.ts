export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number | null;
  date_end: number | null;
}

export interface ArtworkResponse {
  data: Artwork[];
  pagination: {
    total_pages: number;
  };
}
