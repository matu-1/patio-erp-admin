import { Component, OnInit } from '@angular/core';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { clientEditSchema } from '../../configs/form-schema';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { ObjectUtils } from 'src/app/utils/object.util';
import { MerchantClientService } from '../../services/merchant-client.service';
import { ActivatedRoute } from '@angular/router';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  breadcrumbs: Breadcrumbs = [
    { path: PAGE_ROUTE.MERCHANT_CLIENT.LIST, title: 'Clientes' },
    { path: '', title: 'Editar' },
  ];
  clientEditSchema = clientEditSchema;
  form = buildform(clientEditSchema);

  constructor(
    private clientService: MerchantClientService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      await this.getClient(params.id);
      this.getCollectors();
    });
  }

  async getClient(id: number) {
    const res = await handleRequest(() => this.clientService.getById(id));
    if (res)
      this.form.patchValue({
        ...res.data,
      });
  }

  goBack() {
    this.location.back();
  }

  get isLoading() {
    return this.clientService.isLoading || !clientEditSchema[3].options;
  }

  async getCollectors() {
    const res = await handleRequest(() => this.clientService.getCollectors());
    if (res) {
      clientEditSchema[3].options = res.data.map(({ id, name }) => ({
        value: id,
        label: `${id} - ${name}`,
      }));
      this.form.patchValue({
        collectorId: clientEditSchema[3].options.find(
          (item) => item.value == this.form.value.collectorId
        ),
      });
    }
  }

  async save() {
    const value = ObjectUtils.clear(this.form.value);
    const { id } = this.activatedRoute.snapshot.params;
    const res = await handleRequestPg(
      () =>
        this.clientService.update(id, {
          ...value,
          collectorId: value.collectorId.value,
        }),
      true
    );
    if (res) this.goBack();
  }
}
