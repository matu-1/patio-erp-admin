import { Component, Inject, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { handleRequest } from 'src/app/utils/handle-request';
import { SnackBar } from 'src/app/utils/snackbar';
import { paySchema } from '../../config/form-schema';
import { OrderInvoice } from '../../interfaces/order-invoice.interface';
import { CajaService } from '../../../factura/services/caja.service';
import { CuentaContableService } from '../../../factura/services/cuenta-contable.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.dialog.html',
})
export class PayDialog implements OnInit {
  paySchema = paySchema;
  form = buildform(paySchema);

  constructor(
    public dialogRef: MatDialogRef<PayDialog>,
    @Inject(MAT_DIALOG_DATA) private data: OrderInvoice,
    private cajaService: CajaService,
    private cuentaContableService: CuentaContableService
  ) {}

  ngOnInit(): void {
    this.getCajas();
    this.getCuentasContables();
    this.form.reset({
      amount: this.data.balance,
      reason: `PAGO DE FACTURA # ${this.data.id}`,
      paidAt: new Date(),
    });
    this.changeStatus();
  }

  changeStatus() {
    this.form.get('cashId')?.valueChanges.subscribe((value) => {
      if (value) this.form.patchValue({ accountingAccountId: null });
    });
    this.form.get('accountingAccountId')?.valueChanges.subscribe((value) => {
      if (value) this.form.patchValue({ cashId: null });
    });
  }

  get isLoadingCaja() {
    return this.cajaService.isLoading;
  }

  get isLoadingCuentaContable() {
    return this.cuentaContableService.isLoading;
  }

  async getCajas() {
    if (this.paySchema[0].options) return;
    const res = await handleRequest(() => this.cajaService.getAll());
    if (res)
      this.paySchema[0].options = res.data.map((caja) => ({
        value: caja.id,
        label: caja.nombre_responsable,
      }));
  }

  async getCuentasContables() {
    if (this.paySchema[1].options) return;
    const res = await handleRequest(() => this.cuentaContableService.getAll());
    if (res)
      this.paySchema[1].options = res.data.map((item) => ({
        value: item.id,
        label: item.detalle,
      }));
  }

  save() {
    const { value } = this.form;
    if (!value.cashId && !value.accountingAccountId)
      return SnackBar.show('Debe seleccionar una Caja o Banco');

    this.dialogRef.close({
      ...value,
      amount: Number(value.amount),
    });
  }
}
