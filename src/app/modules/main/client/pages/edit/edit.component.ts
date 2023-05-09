import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { ObjectUtils } from 'src/app/utils/object.util';
import {
  clientEditRep2Schema,
  clientEditRep3Schema,
  clientEditSchema,
} from '../../configs/form-schema';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  breadcrumbs: Breadcrumbs = [
    { path: PAGE_ROUTE.CLIENT.LIST, title: 'Clientes' },
    { path: '', title: 'Editar' },
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
    private location: Location,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.getClient(id));
  }

  async getClient(id: number) {
    const res = await handleRequest(() => this.clientService.getById(id));
    if (res)
      this.form.patchValue({
        ...res.data,
        fecha_inicio: res.data.fecha_inicio
          ? new Date(res.data.fecha_inicio + ' ')
          : null,
      });
  }

  goBack() {
    this.location.back();
  }

  get isLoading() {
    return this.clientService.isLoading;
  }

  async save() {
    const value = ObjectUtils.clear(this.form.value);
    const { id } = this.activatedRoute.snapshot.params;
    const res = await handleRequestPg(
      () => this.clientService.update(id, value),
      true
    );
    if (res) this.goBack();
  }
}
