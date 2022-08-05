import { Component, Input, OnInit } from '@angular/core';
import { ChipVariant } from './chip.interface';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() variant: ChipVariant = 'default';
  @Input() class?: string;

  get getClass() {
    switch (this.variant) {
      case 'accent':
        return 'bg-accent';
      case 'primary':
        return 'bg-primary';
      case 'warn':
        return 'bg-warn';
      default:
        return '';
    }
  }
}
