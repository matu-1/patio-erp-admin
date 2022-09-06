import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { ProgressDialog } from './utils/progress-dialog';
import { SnackBar } from './utils/snackbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'patio-erp-app';

  constructor(snackBar: MatSnackBar, router: Router) {
    SnackBar.instance = snackBar;
    router.events.subscribe((event) => {
      console.log('event', event);
      if (event instanceof RouteConfigLoadStart) ProgressDialog.show();
      else if (event instanceof RouteConfigLoadEnd) ProgressDialog.hide();
    });
  }
}
