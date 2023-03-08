import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { payMultipleSchema } from '../../configs/form-schema';
import { PaymentDriver } from '../../interfaces/payment-driver.interface';

@Component({
  selector: 'app-pay-multiple',
  templateUrl: './pay-multiple.dialog.html',
  styleUrls: ['./pay-multiple.dialog.scss'],
})
export class PayMultipleDialog implements OnInit {
  form = buildform(payMultipleSchema);
  payMultipleSchema = payMultipleSchema;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PaymentDriver[],
    private dialogRef: MatDialogRef<PayMultipleDialog>
  ) {
    this.form.patchValue({
      amount: data.reduce((acc, cur) => acc + Number(cur.amount), 0),
    });
  }

  ngOnInit(): void {}

  save() {
    this.dialogRef.close(this.form.value);
  }
}
