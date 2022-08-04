import { Component, Input } from '@angular/core';
import { SkeletonVariant } from './skeleton.interfaces';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {
  @Input() width?: number;
  @Input() height?: number;
  @Input() variant: SkeletonVariant = 'text';

  constructor() {}

  get getClass() {
    switch (this.variant) {
      case 'text':
        return 'skeleton-text';
      case 'circle':
        return 'skeleton-circle';
      default:
        return '';
    }
  }
}
