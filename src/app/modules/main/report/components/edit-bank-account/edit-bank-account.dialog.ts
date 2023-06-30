import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { buildform } from 'src/app/components/text-field/text-field.util';
import {
  editBankAccountSchema,
  editBankAccountZelleSchema,
} from '../../configs/form-schema';
import { BankAccount } from '../../interfaces/hours-worked-driver.interface';

@Component({
  selector: 'app-edit-bank-account',
  templateUrl: './edit-bank-account.dialog.html',
})
export class EditBankAccountDialog {
  title = 'Editar Bank Account';
  form = buildform(editBankAccountSchema);
  formZelle = buildform(editBankAccountZelleSchema);
  editBankAccountSchema = editBankAccountSchema;
  editBankAccountZelleSchema = editBankAccountZelleSchema;
  @ViewChild(MatTabGroup) _tab!: MatTabGroup;

  constructor(
    private dialogRef: MatDialogRef<EditBankAccountDialog>,
    @Inject(MAT_DIALOG_DATA) public data?: BankAccount
  ) {
    if (!data) this.title = 'Crear Bank Account';
    let dataCopy = { ...data };
    if (data?.paymentMethod)
      (dataCopy.paymentMethod as any) = dataCopy.paymentMethod?.split(',');
    // if (data?.type == 0) this.form.patchValue(dataCopy);
    // else this.formZelle.patchValue(dataCopy);
    this.form.patchValue(dataCopy);
    this.formZelle.patchValue(dataCopy);
  }

  save() {
    let value;
    if (this._tab.selectedIndex == 0) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      value = this.form.value;
    } else {
      if (this.formZelle.invalid) {
        this.formZelle.markAllAsTouched();
        return;
      }
      value = this.formZelle.value;
    }
    this.dialogRef.close({ ...value, type: this._tab.selectedIndex });
  }
}
