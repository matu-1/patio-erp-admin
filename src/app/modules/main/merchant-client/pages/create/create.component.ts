import { Component, OnInit } from '@angular/core';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { MerchantClientService } from '../../services/merchant-client.service';
import { Location } from '@angular/common';
import { clientEditSchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { ObjectUtils } from 'src/app/utils/object.util';
import { handleRequestPg } from 'src/app/utils/handle-request';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  breadcrumbs: Breadcrumbs = [
    { title: 'Clientes', path: PAGE_ROUTE.MERCHANT_CLIENT.LIST },
    { title: 'Crear', path: '' },
  ];
  clientEditSchema = clientEditSchema;
  form = buildform(clientEditSchema);

  constructor(
    private clientService: MerchantClientService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  async save() {
    const value = ObjectUtils.clear(this.form.value);
    const res = await handleRequestPg(
      () => this.clientService.create(value),
      true
    );
    if (res) this.goBack();
  }
}
