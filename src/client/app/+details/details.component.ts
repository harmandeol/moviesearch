import { FORM_DIRECTIVES } from '@angular/common';
import { Component } from '@angular/core';
import { RouteSegment, Router, OnActivate } from '@angular/router';

import { MoviesService, Movie, RatingComponent, SliceWordsPipe } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'movie-details',
  templateUrl: 'details.component.html',
  directives: [FORM_DIRECTIVES, RatingComponent],
  pipes:[SliceWordsPipe]
})

export class MovieDetailsComponent implements OnActivate {
  movie: Movie;
  imdbID: string;
  max: number;
  showFullPlotVisible: boolean;

  constructor(private moviesService: MoviesService, private router: Router) {
    this.max = 10;
  }

  getMovie(imdbID: string) {
     if(imdbID) {
        this.moviesService.get(imdbID).subscribe(movie => {
          this.movie = movie;
          this.showFullPlotVisible = movie.Plot.length > this.max;
        });
    }
  }

  showFullPlot() {
    this.max = this.movie.Plot.length;
    this.showFullPlotVisible = false;
  }

  routerOnActivate(curr: RouteSegment) {
    this.getMovie(curr.getParam('id'));
  }
}
