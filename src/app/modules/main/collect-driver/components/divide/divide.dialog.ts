import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CollectDriver } from '../../interfaces/payment-driver.interface';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { dividePaymentDriverSchema } from '../../configs/form-schema';

@Component({
  selector: 'app-divide',
  templateUrl: './divide.dialog.html',
})
export class DivideDialog implements OnInit {
  form = buildform(dividePaymentDriverSchema);
  dividePaymentDriverSchema = dividePaymentDriverSchema;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CollectDriver,
    private dialogRef: MatDialogRef<DivideDialog>
  ) {
    this.form.patchValue({
      ...data,
      fistDate: new Date(data.startDate + ' 00:00:00'),
      secondDate: new Date(data.startDate + ' 00:00:00'),
    });
    this.form.get('fistDate')!.disable();
    this.form.get('fistAmount')!.disable();
  }

  ngOnInit(): void {
    this.changeValues();
  }

  changeValues() {
    this.form.get('secondAmount')?.valueChanges.subscribe((value) => {
      if (!isNaN(value))
        this.form.get('fistAmount')?.setValue(this.data.amount - value);
    });
  }

  save() {
    const value = this.form.getRawValue();
    this.dialogRef.close({
      ...value,
    });
  }
}
