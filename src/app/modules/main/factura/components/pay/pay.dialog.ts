import { Component, Inject, OnInit } from '@angular/core';
import { paySchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Factura } from '../../interfaces/factura.interface';
import { CajaService } from '../../services/caja.service';
import { CuentaContableService } from '../../services/cuenta-contable.service';
import { handleRequest } from 'src/app/utils/handle-request';
import { SnackBar } from 'src/app/utils/snackbar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.dialog.html',
})
export class PayDialog implements OnInit {
  paySchema = paySchema;
  form = buildform(paySchema);

  constructor(
    public dialogRef: MatDialogRef<PayDialog>,
    @Inject(MAT_DIALOG_DATA) private data: Factura,
    private cajaService: CajaService,
    private cuentaContableService: CuentaContableService
  ) {}

  ngOnInit(): void {
    this.getCajas();
    this.getCuentasContables();
    const ingreso =
      this.data.pagado == 'no' ? this.data.monto_conciliado : this.data.saldo;
    this.form.reset({
      ingreso,
      glosa: `PAGO DE FACTURA # ${this.data.id}`,
      fecha: new Date(),
    });
    this.changeStatus();
  }

  changeStatus() {
    this.form.get('id_caja')?.valueChanges.subscribe((value) => {
      if (value) this.form.patchValue({ cuenta_contable_id: null });
    });
    this.form.get('cuenta_contable_id')?.valueChanges.subscribe((value) => {
      if (value) this.form.patchValue({ id_caja: null });
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
    if (!value.id_caja && !value.cuenta_contable_id)
      return SnackBar.show('Debe seleccionar una Caja o Banco');
    this.dialogRef.close({
      ...value,
      ingreso: Number(value.ingreso),
      id_caja: value.id_caja ?? 0,
      cuenta_contable_id: value.cuenta_contable_id ?? 0,
      fecha: new DatePipe('en').transform(value.fecha, 'yyyy-MM-dd'),
    });
  }
}
