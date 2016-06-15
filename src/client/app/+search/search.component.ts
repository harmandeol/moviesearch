import { FORM_DIRECTIVES } from '@angular/common';
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { MoviesService, MovieSummary, FocusableDirective } from '../shared/index';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'movie-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, FocusableDirective]
})

export class MovieSearchComponent {
  @Input() isOpen: boolean;
  @Output() onOverlayClosed = new EventEmitter<boolean>();
  @ViewChild(FocusableDirective) focusable:FocusableDirective;
  searchTermStream = new Subject<string>();
  movies: Observable<MovieSummary[]> = this.searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((searchValue: string) => {
      if(!!searchValue) {
        let year  = searchValue.match(/(?:^|\b)(\d+)(?=\b|$)/);
        let title = searchValue.replace(/(?:^|\b)(\d+)(?=\b|$)/, '').trim();
        return this.moviesService.find(title, (year !== null && year.length !== 0) ? Number(year[0]): undefined);
      } else {
         return new Observable<MovieSummary[]>();
      }

  });

  constructor(public moviesService: MoviesService, private router: Router) {}


  search(searchValue: string): void {
    this.searchTermStream.next(searchValue);
  }

  openOverlay(): void {
    this.isOpen = true;
    this.focusable.focus();
  }

  closeOverlay(): void {
    this.isOpen = false;
    this.onOverlayClosed.emit(true);
  }
}
