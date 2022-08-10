import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBar } from './utils/snackbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'patio-erp-app';

  constructor(snackBar: MatSnackBar) {
    SnackBar.instance = snackBar;
  }
}
