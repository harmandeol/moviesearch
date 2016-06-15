import {Injectable} from '@angular/core';

@Injectable()
export class Movie {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
  Released: Date;
  runtime: string;
  imdbRating: number;
  Plot: string;

  constructor(Title: string,
              Year: number,
              imdbID: string,
              Type: string,
              Poster: string,
              Released: Date,
              runtime: string,
              imdbRating: number,
              Plot: string ) {
     this.Title = Title;
     this.Year = Year;
     this.imdbID = imdbID;
     this.Type = Type;
     this.Poster = Poster;
     this.Released = Released;
     this.runtime = runtime;
     this.imdbRating = imdbRating;
     this.Plot = Plot;
  }
}
