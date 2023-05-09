import { Component } from '@angular/core';
import { revertPaymentSchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-revert-payment',
  templateUrl: './revert-payment.dialog.html',
})
export class RevertPaymentDialog {
  revertPaymentSchema = revertPaymentSchema;
  form = buildform(revertPaymentSchema);

  constructor(private dialogRef: MatDialogRef<RevertPaymentDialog>) {}

  save() {
    this.dialogRef.close(this.form.value);
  }
}
