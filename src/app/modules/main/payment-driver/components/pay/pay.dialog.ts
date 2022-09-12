import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { paySchema } from '../../configs/form-schema';
import { PaymentDriver } from '../../interfaces/payment-driver.interface';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.dialog.html',
})
export class PayDialog {
  form = buildform(paySchema);
  paySchema = paySchema;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: PaymentDriver,
    private dialogRef: MatDialogRef<PayDialog>
  ) {}

  save() {
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }
}
