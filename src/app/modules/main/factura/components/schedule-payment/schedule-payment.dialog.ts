import { Component } from '@angular/core';
import { schedulePaymentSchema } from '../../configs/form-schema';
import { buildform } from '../../../../../components/text-field/text-field.util';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-payment',
  templateUrl: './schedule-payment.dialog.html',
})
export class SchedulePaymentDialog {
  schedulePaymentSchema = schedulePaymentSchema;
  form = buildform(schedulePaymentSchema);

  constructor(private dialogRef: MatDialogRef<SchedulePaymentDialog>) {}

  save() {
    const { value } = this.form;
    this.dialogRef.close({
      fecha_cobro: new DatePipe('en').transform(
        value.fecha_cobro,
        'yyyy-MM-dd'
      ),
    });
  }
}
