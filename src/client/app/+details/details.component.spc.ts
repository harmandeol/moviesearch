import { Component, provide } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { BaseRequestOptions, ConnectionBackend, Http, HTTP_PROVIDERS } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';

import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { MoviesService, Movie, SliceWordsPipe, RatingComponent } from '../shared/index';
import { MovieDetailsComponent } from './details.component';
import { RouteSegment, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


export function main() {
  describe('MovieDetails component', () => {

    it('should render the movie details',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            rootTC.detectChanges();

            let movieDetailsInstance = rootTC.debugElement.children[0].componentInstance;
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(movieDetailsInstance.moviesService).toEqual(jasmine.any(MoviesService));
            expect(getDOM().getElementsByTagName(homeDOMEl, 'h1')[0].textContent).toEqual('');


           let movie = new Movie('The Movie',
                      1990,
                      'tt234343',
                      'movie',
                      'http://obdbapi/blah.jpg',
                      new Date(23032010),
                      '23 min',
                      6.0,
                      'this is really long plot with many words, may be more than 10 words'
                      );
            movieDetailsInstance.moviesService.get = jasmine.createSpy('get').and.returnValue(
              Observable.create(function(observer: Observer<Movie>) {
                observer.next(movie);
                observer.complete();
              })
            );

            let routeSegment: RouteSegment;
            routeSegment = jasmine.createSpyObj('RouteSegment', ['getParam']).and.returnValue('ttYYY');
            movieDetailsInstance.routerOnActivate(routeSegment);
            rootTC.detectChanges();

            expect(getDOM().getElementsByTagName(homeDOMEl, 'h1')[0].textContent).toEqual('The Movie');
            expect(getDOM().getElementsByTagName(homeDOMEl, 'article')[0].textContent)
            .toEqual('this is really long plot with many words, may be ...');

          });
      }));
  });
}

@Component({
  providers: [
    HTTP_PROVIDERS,
    FORM_DIRECTIVES,
    MoviesService,
    Router,
    RatingComponent,
    SliceWordsPipe,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
  ],
  selector: 'test-cmp',
  template: '<movie-details></movie-details>',
  directives: [MovieDetailsComponent]
})
class TestComponent {}
