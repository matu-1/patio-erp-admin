import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss'],
})
export class SimpleCardComponent {
  @Input() class?: string;
  @Input() isLoading: boolean = false;

  constructor() {}
}
