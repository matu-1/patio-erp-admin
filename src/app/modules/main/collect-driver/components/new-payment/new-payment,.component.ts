import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { PaymentDriverType } from '../../../payment-driver/constants/payment-driver-type';
import { createCollectDriverSchema } from '../../configs/form-schema';
import { CollectDriverService } from '../../services/collect-driver.service';
import { ReportService } from '../../../report/services/report.service';
import { DateUtils } from '../../../../../utils/date.util';
import { FormControl } from '@angular/forms';
import {
  combineLatest,
  combineLatestWith,
  switchMap,
  zip,
  catchError,
  of,
} from 'rxjs';
import { SnackBar } from '../../../../../utils/snackbar';
import { Response } from '../../../../../utils/response';
import { responseBank } from 'src/app/constants/config.constant';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
})
export class NewPaymentComponent implements OnInit {
  @Input() title = 'Crear Cobro';
  PAGE_ROUTE = PAGE_ROUTE;
  createCollectDriverSchema = createCollectDriverSchema;
  form = buildform(createCollectDriverSchema);
  @Input() breadcrumbs: Breadcrumbs = [
    { path: PAGE_ROUTE.COLLECT_DRIVER.LIST, title: 'Cobros Driver' },
    { path: '', title: this.title },
  ];
  @Input() type: number = PaymentDriverType.Cobro;

  constructor(
    private location: Location,
    private collectDriverService: CollectDriverService,
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.setQueryParams();
    this.getDrivers();
  }

  setQueryParams() {
    this.activatedRoute.queryParams.subscribe(({ start, end, driverId }) => {
      if (end) this.form.addControl('end', new FormControl(new Date(end)));
      this.form.patchValue({
        driverId: Number(driverId),
        date: new Date(start),
      });
    });
  }

  async getDrivers() {
    const res = await handleRequest(() =>
      this.collectDriverService.getDrivers()
    );
    if (res)
      createCollectDriverSchema[0].options = res.data.map(({ id, name }) => ({
        value: id,
        label: `${id} - ${name}`,
      }));
  }

  isLoading() {
    return !createCollectDriverSchema[0].options;
  }

  goBack() {
    this.location.back();
  }

  refresh() {
    const { driverId, date, end } = this.form.value;
    if (!end) return of(responseBank);
    return this.reportService
      .refresh({
        driverId,
        type: PaymentDriverType.Pago, //xq refresco el pago
        startDate: DateUtils.getMinHourMoment(DateUtils.getMaxHour(date)),
        endDate: DateUtils.getMaxHourMoment(DateUtils.getMaxHour(end)),
      })
      .pipe(
        catchError((error) => {
          SnackBar.show(error.message, { variant: error.type });
          return of(responseBank);
        })
      );
  }

  async save() {
    const value = this.form.value;
    const body = {
      ...value,
      startDate: value.date,
      endDate: value.date,
      type: this.type,
    };
    const res = await handleRequestPg(() => {
      return this.collectDriverService
        .create(body)
        .pipe(switchMap((_) => this.refresh()));
    });
    if (res) this.goBack();
  }
}
