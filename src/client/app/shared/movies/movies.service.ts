import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Movie, MovieSummary } from './models/index';
import CONFIG = require('./movies.config');
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

class UrlBuilder {
  constructor(private url:string, private token:string) {
     if (this.token) {
      this.url += `?apiKey=${CONFIG.OMDB_API_TOKEN}`;
     } else {
      this.url += `?`;
     }
  }
  title(title:string):UrlBuilder {
    this.url += `&s=${title}`;
    return this;
  }
  imdbId(id:string):UrlBuilder {
    if (id) {
      this.url += `&i=${id}&plot=full`;
    }
    return this;
  }
  year(year:number):UrlBuilder {
    if (year) {
      this.url += `&y=${year}`;
    }
    return this;
  }
  toString(): string { return this.url; }
}

/**
 * This class provides the Movies service with methods to read names and add names.
 */
@Injectable()
export class MoviesService {

  private urlBuilder: UrlBuilder;

  /**
   * Creates a new MoviesService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}


  find(title: string, year?: number): Observable<MovieSummary[]> {
    this.urlBuilder = new UrlBuilder(CONFIG.OMDB_API_ROOT, CONFIG.OMDB_API_TOKEN);
    return this.http.get(this.urlBuilder.title(title).year(year).toString())
        .map((response: Response) => response.json())
        .map((data: any) => {
          return <MovieSummary[]>data.Search;
        });
    }

  get(id: string): Observable<Movie> {
    this.urlBuilder = new UrlBuilder(CONFIG.OMDB_API_ROOT, CONFIG.OMDB_API_TOKEN);
    return this.http.get(this.urlBuilder.imdbId(id).toString())
        .map((response: Response) => response.json())
        .map((data: any) => {
          return <Movie>data;
        });
    }
}

