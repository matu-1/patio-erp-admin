import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { handleRequestPg } from 'src/app/utils/handle-request';
import { ObjectUtils } from 'src/app/utils/object.util';
import {
  clientEditRep2Schema,
  clientEditRep3Schema,
  clientEditSchema,
} from '../../configs/form-schema';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  breadcrumbs: Breadcrumbs = [
    { title: 'Clientes', path: PAGE_ROUTE.CLIENT.LIST },
    { title: 'Crear', path: '' },
  ];
  clientEditSchema = clientEditSchema;
  clientEditRep2Schema = clientEditRep2Schema;
  clientEditRep3Schema = clientEditRep3Schema;
  form = buildform([
    ...clientEditSchema,
    ...clientEditRep2Schema,
    ...clientEditRep3Schema,
  ]);

  constructor(
    private clientService: ClientService,
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
