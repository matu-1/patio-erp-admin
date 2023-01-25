import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { PaymentDriverType } from '../../../payment-driver/constants/payment-driver-type';
import { createCollectDriverSchema } from '../../configs/form-schema';
import { CollectDriverService } from '../../services/collect-driver.service';

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
    private collectDriverService: CollectDriverService
  ) {}

  ngOnInit(): void {
    this.getDrivers();
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

  async save() {
    const value = this.form.value;
    const body = {
      ...value,
      startDate: value.date,
      endDate: value.date,
      type: this.type,
    };
    const res = await handleRequestPg(() =>
      this.collectDriverService.create(body)
    );
    if (res) this.goBack();
  }
}
