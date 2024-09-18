export interface Movie {
  Title: string;
  Year?: string;
  imdbID: string;
  Type: string;
  Poster?: string;
}

export interface MovieItemProps {
  movie?: Movie;
}
