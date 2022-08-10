import { Component } from '@angular/core';
import { ProgressDialog } from 'src/app/utils/progress-dialog';
import { ProgressDialogService } from './progress-dialog.service';

@Component({
  selector: 'app-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styles: [
    `
      .spinner-color ::ng-deep circle {
        stroke: white;
      }
    `,
  ],
})
export class ProgressDialogComponent {
  constructor(private progressDialogService: ProgressDialogService) {
    ProgressDialog.instance = progressDialogService;
  }

  get open() {
    return this.progressDialogService.open;
  }
}
