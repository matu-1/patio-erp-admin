import { Component } from '@angular/core';
import { buildform } from '../../../../../components/text-field/text-field.util';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { schedulePaymentSchema } from '../../config/form-schema';

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
    this.dialogRef.close(value);
  }
}
