import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { editPaymentDriverSchema } from '../../configs/form-schema';
import { PaymentDriver } from '../../interfaces/payment-driver.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.scss'],
})
export class EditDialog {
  form = buildform(editPaymentDriverSchema);
  editPaymentDriverSchema = editPaymentDriverSchema;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PaymentDriver,
    private dialogRef: MatDialogRef<EditDialog>
  ) {
    this.form.patchValue(data);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
