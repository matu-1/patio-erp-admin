import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

type Config = {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
};

export class SnackBar {
  static instance: MatSnackBar;

  static show(message: string, config: Config = {}) {
    const variantsClass = {
      success: 'snackbar-bg-success',
      warning: 'snackbar-bg-warning',
      error: 'snackbar-bg-error',
      info: 'snackbar-bg-info',
      default: 'snackbar-bg-default',
    };
    const variantClass = variantsClass[config.variant ?? 'default'];

    this.instance.openFromComponent(SnackBarComponent, {
      data: {
        message,
        variant: config.variant
      },
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ['snackbar-bg', variantClass],
    });
  }
}
