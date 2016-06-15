import { Component } from '@angular/core';
import { HTTP_PROVIDERS} from '@angular/http';

import { MovieSearchComponent } from './+search/index';
import { MovieDetailsComponent } from './+details/index';

import { MoviesService, ToolbarComponent } from './shared/index';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'movie-app',
  viewProviders: [MoviesService, HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, ToolbarComponent, MovieSearchComponent]
})

@Routes([
  {
    path: '/:id',
    component: MovieDetailsComponent
  }
])

export class AppComponent {
  isSearchOpen: boolean;
  onSearch(value: boolean) {
    this.isSearchOpen = value;
  }
}
