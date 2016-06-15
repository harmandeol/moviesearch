import { Component, Input} from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'star-rating',
  templateUrl: 'rating.component.html',
  directives: [FORM_DIRECTIVES]
})

export class RatingComponent {
  @Input() rate: number;
  range: Array<number> = [1,2,3,4,5,6,7,8,9,10];
}
