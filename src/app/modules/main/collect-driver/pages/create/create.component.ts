import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { PaymentDriverType } from '../../../payment-driver/constants/payment-driver-type';
import { createCollectDriverSchema } from '../../configs/form-schema';
import { CollectDriverService } from '../../services/collect-driver.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  title = 'Crear Cobro';
  PAGE_ROUTE = PAGE_ROUTE;
  createCollectDriverSchema = createCollectDriverSchema;
  form = buildform(createCollectDriverSchema);

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
    const body = {
      ...this.form.value,
      type: PaymentDriverType.Cobro,
    };
    const res = await handleRequestPg(() =>
      this.collectDriverService.create(body)
    );
    if (res) this.goBack();
  }
}
