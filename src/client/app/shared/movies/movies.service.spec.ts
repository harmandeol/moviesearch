import { provide, ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, HTTP_PROVIDERS, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { MoviesService, } from './movies.service';
import { MovieSummary} from './models/index';

export function main() {
  describe('Movie Service', () => {
    let moviesService: MoviesService;
    let backend: MockBackend;
    let initialResponse: any;

    beforeEach(() => {
      let injector = ReflectiveInjector.resolveAndCreate([
        HTTP_PROVIDERS,
        MoviesService,
        BaseRequestOptions,
        MockBackend,
        provide(Http, {
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }),
      ]);
      moviesService = injector.get(MoviesService);
      backend = injector.get(MockBackend);

      let connection: any;
      backend.connections.subscribe((c: any) => connection = c);
      initialResponse = moviesService.find('titanic',1997);
      connection.mockRespond(new Response(new ResponseOptions(
        {
          body: `{"Search":[{"Title":"Titanic","Year":"1997","imdbID":"tt0120338","Type":"movie",
                  "Poster":"http://ia.media-imdb.com/yo.jpg"}],"totalResults":"1","Response":"True"}`
        })));
    });

    it('should return an Observable when get called', () => {
      expect(initialResponse).toEqual(jasmine.any(Observable));
    });

    it('should resolve to list of movies when get called', () => {
      let result: MovieSummary[];
      initialResponse.subscribe((data: any) => result = data);
      expect(result.length).toEqual(1);
      expect(result[0].imdbID).toBe('tt0120338');
    });
  });
}
