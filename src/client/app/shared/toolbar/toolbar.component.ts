import { Component, Output, EventEmitter} from '@angular/core';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'movie-toolbar',
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent {
  @Output() onSearch = new EventEmitter<boolean>();
  search(searching: boolean) {
    this.onSearch.emit(searching);
  }
}
