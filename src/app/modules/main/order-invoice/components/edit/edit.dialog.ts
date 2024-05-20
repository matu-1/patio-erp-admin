import { Component, Inject, OnInit } from '@angular/core';
import { OrderInvoice } from '../../interfaces/order-invoice.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { editSchema } from '../../config/form-schema';
import { FormatDate } from 'src/app/utils/format.date.util';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.scss'],
})
export class EditDialog implements OnInit {
  editSchema = editSchema;
  form = buildform(editSchema);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OrderInvoice,
    private dialogRef: MatDialogRef<EditDialog>
  ) {}

  ngOnInit(): void {
    this.form.reset({
      ...this.data,
      issueDate: FormatDate.short(this.data.issue_date),
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
