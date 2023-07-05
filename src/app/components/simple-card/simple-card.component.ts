import { Component, Input } from '@angular/core';
import { CardActions } from './simple-card.interface';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss'],
})
export class SimpleCardComponent {
  @Input() class?: string;
  @Input() isLoading: boolean = false;
  @Input() title?: string;
  @Input() actions?: CardActions;

  constructor() {}
}
