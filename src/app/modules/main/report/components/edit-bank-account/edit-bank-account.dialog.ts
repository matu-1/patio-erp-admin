import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { editBankAccountSchema } from '../../configs/form-schema';
import { BankAccount } from '../../interfaces/hours-worked-driver.interface';

@Component({
  selector: 'app-edit-bank-account',
  templateUrl: './edit-bank-account.dialog.html',
})
export class EditBankAccountDialog {
  title = 'Editar Bank Account';
  form = buildform(editBankAccountSchema);
  editBankAccountSchema = editBankAccountSchema;

  constructor(
    private dialogRef: MatDialogRef<EditBankAccountDialog>,
    @Inject(MAT_DIALOG_DATA) data: BankAccount
  ) {
    if(!data) this.title = "Crear Bank Account"
    this.form.patchValue(data);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
