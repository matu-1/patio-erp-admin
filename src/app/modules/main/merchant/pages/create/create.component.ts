import { Component, OnInit } from '@angular/core';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { merchantCreateSchema } from '../../configs/form-schema';
import { Location } from '@angular/common';
import { ObjectUtils } from 'src/app/utils/object.util';
import { MerchantService } from '../../services/merchant.service';
import { handleRequestPg } from 'src/app/utils/handle-request';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  breadcrumbs: Breadcrumbs = [
    { path: PAGE_ROUTE.MERCHANT.LIST, title: 'Comercios' },
    { path: '', title: 'Crear' },
  ];
  merchantCreateSchema = merchantCreateSchema;
  form = buildform(merchantCreateSchema);

  constructor(
    private location: Location,
    private merchantService: MerchantService
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  async save() {
    const value = ObjectUtils.clear(this.form.value);
    const res = await handleRequestPg(() => this.merchantService.getAll());
    if (res) this.goBack();
  }
}
