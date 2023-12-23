import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { paySchema } from '../../configs/form-schema';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.dialog.html',
  styleUrls: ['./pay.dialog.scss'],
})
export class PayDialog implements OnInit {
  form = buildform(paySchema);
  paySchema = paySchema;

  constructor(private dialogRef: MatDialogRef<PayDialog>) {}

  ngOnInit(): void {}

  setAmount(value: number) {
    this.form.get('amount')?.setValue(value);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
