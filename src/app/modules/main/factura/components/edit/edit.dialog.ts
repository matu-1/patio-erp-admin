import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { Factura, InvoiceDetail } from '../../interfaces/factura.interface';
import { editSchema } from '../../configs/form-schema';
import { DatePipe } from '@angular/common';
import { ObjectUtils } from '../../../../../utils/object.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { FacturaService } from '../../services/factura.service';
import { invoiceDetailColumns } from '../../configs/table-columns';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.scss'],
})
export class EditDialog implements OnInit {
  form = buildform(editSchema);
  editSchema = editSchema;
  invoiceDetailColumns = invoiceDetailColumns;
  invoiceDetails?: InvoiceDetail[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Factura,
    private dialogRef: MatDialogRef<EditDialog>,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    console.log('data', this.data);
    this.form.reset({
      ...this.data,
      fecha_emision: new DatePipe('en').transform(
        this.data.fecha_emision,
        'dd/MM/yyyy'
      ),
    });
    this.getInvoiceDetails();
  }

  async getInvoiceDetails() {
    const res = await handleRequest(() =>
      this.facturaService.getInvoiceDetails(this.data.id)
    );
    if (res) this.invoiceDetails = res.data;
  }

  save() {
    console.log('this.value', this.form.value);
    console.log('clean', ObjectUtils.clear(this.form.value));
    const value = ObjectUtils.clear(this.form.value);
    this.dialogRef.close(value);
  }
}
