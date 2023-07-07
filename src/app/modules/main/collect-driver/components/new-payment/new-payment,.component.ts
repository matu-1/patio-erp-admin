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
import { FormControl } from '@angular/forms';
import { switchMap, catchError, of } from 'rxjs';
import { SnackBar } from '../../../../../utils/snackbar';
import { responseBank } from 'src/app/constants/config.constant';
import { categoryValue } from '../../constants/payment-method';

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
  isNotRefresh = 0;
  driverId?: number;

  constructor(
    private location: Location,
    private collectDriverService: CollectDriverService,
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.parseFormFromQuery();
    this.getDrivers();
  }

  parseFormFromQuery() {
    this.activatedRoute.queryParams.subscribe(
      ({ start, end, driverId, date, isNotRefresh }) => {
        if (isNotRefresh) this.isNotRefresh = Number(isNotRefresh);
        if (end) this.form.addControl('end', new FormControl(new Date(end)));
        if (start)
          this.form.addControl('start', new FormControl(new Date(start)));
        if (start && driverId) {
          this.driverId = driverId;
          this.form.patchValue({
            driverId: { value: Number(driverId) },
            category: categoryValue.other,
            date: new Date(date),
          });
        }
      }
    );
  }

  async getDrivers() {
    const res = await handleRequest(() =>
      this.collectDriverService.getDrivers()
    );
    if (res) {
      createCollectDriverSchema[0].options = res.data.map(({ id, name }) => ({
        value: id,
        label: `${id} - ${name}`,
      }));
      if (this.driverId)
        this.form.patchValue({
          driverId: createCollectDriverSchema[0].options.find(
            (item) => item.value == this.driverId
          ),
        });
    }
  }

  isLoading() {
    return !createCollectDriverSchema[0].options;
  }

  goBack() {
    this.location.back();
  }

  refresh() {
    const { driverId, start, end } = this.form.value;
    if (!end || this.isNotRefresh) return of(responseBank);
    return this.reportService
      .refresh({
        driverId,
        type: PaymentDriverType.Pago, //xq refresco el pago
        // startDate: DateUtils.getMinHourMoment(DateUtils.getMaxHour(date)),
        startDate: new Date(start),
        // endDate: DateUtils.getMaxHourMoment(DateUtils.getMaxHour(end)),
        endDate: new Date(end),
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
      driverId: value.driverId.value,
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
