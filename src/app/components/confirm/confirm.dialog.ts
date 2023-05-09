import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export type ConfirmData = {
  title?: string;
  message: string;
};

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm.dialog.html',
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data?: ConfirmData) {
    if (data) data.title = data.title ?? 'Confirmar';
  }
}
