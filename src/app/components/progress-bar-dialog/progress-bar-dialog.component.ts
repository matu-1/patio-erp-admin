import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar-dialog',
  templateUrl: './progress-bar-dialog.component.html',
  styles: [`
    .progress {
      margin: -1.5rem -1.5rem 1.25rem; 
      width: auto;
    }
  `]
})
export class ProgressBarDialogComponent {
  @Input() isLoading = false;
  constructor() {}
}
