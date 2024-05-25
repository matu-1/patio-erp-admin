import { Component, OnInit } from '@angular/core';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { merchantEditSchema } from '../../configs/form-schema';
import { MerchantService } from '../../services/merchant.service';
import { ActivatedRoute } from '@angular/router';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { Location } from '@angular/common';
import { ObjectUtils } from 'src/app/utils/object.util';
import { MerchantClientService } from '../../../merchant-client/services/merchant-client.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  breadcrumbs: Breadcrumbs = [
    { path: PAGE_ROUTE.MERCHANT.LIST, title: 'Clientes' },
    { path: '', title: 'Editar' },
  ];
  merchantEditSchema = merchantEditSchema;
  form = buildform(merchantEditSchema);

  constructor(
    private merchantService: MerchantService,
    private clientService: MerchantClientService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      await this.getMerchant(params.id);
      this.getClients();
    });
  }

  async getMerchant(id: number) {
    const res = await handleRequest(() => this.merchantService.getById(id));
    if (res)
      this.form.patchValue({
        ...res.data,
      });
  }

  async getClients() {
    const res = await handleRequest(() =>
      this.clientService.getPaginated({ page: 0, limit: 100000000, length: 1 })
    );
    if (res) {
      merchantEditSchema[8].options = res.data.records.map(({ id, name }) => ({
        value: id,
        label: `${id} - ${name}`,
      }));
      this.form.patchValue({
        clientId: merchantEditSchema[8].options.find(
          (item) => item.value == this.form.value.clientId
        ),
      });
    }
  }

  goBack() {
    this.location.back();
  }

  get isLoading() {
    return (
      this.merchantService.isLoading.getById || !merchantEditSchema[8].options
    );
  }

  async save() {
    const value = ObjectUtils.clear(this.form.value);
    const { id } = this.activatedRoute.snapshot.params;
    const res = await handleRequestPg(
      () =>
        this.merchantService.update(id, {
          ...value,
          clientId: value.clientId.value,
        }),
      true
    );
    if (res) this.goBack();
  }
}
