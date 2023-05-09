import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

type SnackBarData = {
  message: string;
  variant: string;
};

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  icon?: string;
  
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {
    const variantsIcon: any = {
      success: 'check_circle',
      warning: 'warning',
      error: 'cancel',
      info: 'info',
      default: undefined,
    };
    this.icon = variantsIcon[data.variant || 'default'];
  }
}
