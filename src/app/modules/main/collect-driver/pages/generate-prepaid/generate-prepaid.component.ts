import { Component, OnInit } from '@angular/core';
import { DateUtils } from 'src/app/utils/date.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { CollectDriverService } from '../../services/collect-driver.service';
import { CollectDriver } from '../../interfaces/payment-driver.interface';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { collectPrepaidFilterSchema } from '../../configs/form-schema';
import { paymentsDriverColumns } from '../../configs/table-columns';
import { categoryValue } from '../../constants/payment-method';
import { Location } from '@angular/common';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/components/confirm/confirm.dialog';

@Component({
  selector: 'app-generate-prepaid',
  templateUrl: './generate-prepaid.component.html',
})
export class GeneratePrepaidComponent implements OnInit {
  title = 'Generar Cobros Anticipo';
  paymentsDriver?: CollectDriver[];
  collectPrepaidFilterSchema = collectPrepaidFilterSchema;
  collectPrepaidSchema = [...collectPrepaidFilterSchema];
  form = buildform(collectPrepaidFilterSchema);
  formPrepaid = buildform(this.collectPrepaidSchema);
  paymentsDriverColumns = paymentsDriverColumns;
  breadcrumbs: Breadcrumbs = [
    { path: PAGE_ROUTE.COLLECT_DRIVER.LIST, title: 'Cobros Driver' },
    { path: '', title: this.title },
  ];

  constructor(
    private collectDriverService: CollectDriverService,
    private location: Location,
    private dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.getPaymentsDriver();
  }

  async getPaymentsDriver() {
    this.paymentsDriver = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.collectDriverService.getPaymentsDriver({
        ...value,
        start: value.week.start,
        end: DateUtils.getMaxHour(value.week.end),
        category: categoryValue.cash,
      })
    );
    if (res) this.paymentsDriver = res.data;
  }

  filter() {
    this.getPaymentsDriver();
  }

  goBack() {
    this.location.back();
  }

  showConfirmGenerateDlg() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        message: '¿Está seguro de realizar esta acción?',
      },
    });
    dialogRef.afterClosed().subscribe((ok) => ok && this.generateCollect());
  }

  async generateCollect() {
    if (!this.paymentsDriver || this.paymentsDriver.length == 0) return;
    const value = this.formPrepaid.value;
    const res = await handleRequest(
      () =>
        this.collectDriverService.generateCollection({
          ids: this.paymentsDriver!.map((item) => item.id),
          toStart: DateUtils.getMinHour(value.week.start),
          toEnd: DateUtils.getMaxHour(value.week.end),
        }),
      true
    );
    if (res) this.filter();
  }
}
