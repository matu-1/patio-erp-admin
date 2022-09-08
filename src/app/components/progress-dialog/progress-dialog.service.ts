import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressDialogService {
  open = true;

  constructor() {}

  show() {
    this.open = true;
  }

  hide() {
    this.open = false;
  }

  toggle() {
    if (this.open) this.hide();
    else this.show();
  }
}
