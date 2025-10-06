export interface Artist {
  id: string;
  name: string;
  image_url?: string;
}

export interface Album {
  id: string;
  title: string;
  artist_id: string;
  cover_url?: string;
  release_year?: number;
}

export interface Song {
  id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  album_id?: string;
  duration: number;
  audio_url?: string;
  cover_url?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  cover_url?: string;
  songs: Song[];
}
