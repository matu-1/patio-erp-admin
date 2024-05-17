import { Component, OnInit } from '@angular/core';
import { revertPaymentSchema } from '../../config/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-revert-payment',
  templateUrl: './revert-payment.dialog.html',
})
export class RevertPaymentDialog implements OnInit {
  revertPaymentSchema = revertPaymentSchema;
  form = buildform(revertPaymentSchema);

  constructor(private dialogRef: MatDialogRef<RevertPaymentDialog>) {}

  ngOnInit(): void {}

  save() {
    this.dialogRef.close(this.form.value);
  }
}
