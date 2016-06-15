import {Injectable} from '@angular/core';

@Injectable()
export class MovieSummary {
  Title: string;
  Year: number;
  imdbID: string;
  type: string;
  poster: string;
}
