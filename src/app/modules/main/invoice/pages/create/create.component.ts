import { Component, OnInit } from '@angular/core';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { buildform } from 'src/app/components/text-field/text-field.util';
import {
  createInvoiceSchema,
  createDiscountSchema,
} from '../../configs/form-schema';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { Location } from '@angular/common';
import { handleRequestPg, handleRequest } from 'src/app/utils/handle-request';
import { InvoiceService } from '../../services/invoice.service';
import { FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ReportService } from '../../../report/services/report.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  title = 'Nuevo';
  breadcrumbs: Breadcrumbs = [
    { path: PAGE_ROUTE.INVOICE.LIST, title: 'Invoices' },
    { path: '', title: this.title },
  ];
  createInvoiceSchema = createInvoiceSchema;
  form = buildform(createInvoiceSchema);
  createDiscountSchema = createDiscountSchema;

  constructor(
    private location: Location,
    private invoiceService: InvoiceService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.getMerchants();
    this.changeValues();
    this.form.addControl(
      'discounts',
      new FormArray([buildform(createDiscountSchema)])
    );
  }

  goBack() {
    this.location.back();
  }

  changeValues() {
    this.form.valueChanges.subscribe((value) => {
      const { amount, tips, fee, discounts } = value;
      if (amount && tips && fee != undefined) {
        const totalDiscounts = discounts.reduce(
          (acc: number, cur: any) => acc + Number(cur.amount),
          0
        );
        const total =
          Number(amount) + Number(tips) + Number(fee) - totalDiscounts;
        if (!isNaN(total) && total != value.total)
          this.form.get('total')?.setValue(total);
      }
    });
  }

  get formDiscounts() {
    return this.form.get('discounts') as FormArray;
  }

  getFormDiscount(control: AbstractControl) {
    return control as FormGroup;
  }

  addDiscount() {
    this.formDiscounts.push(buildform(createDiscountSchema));
  }

  removeDiscount(index: number) {
    this.formDiscounts.removeAt(index);
  }

  async getMerchants() {
    const res = await handleRequest(() => this.reportService.getMerchants());
    if (res)
      this.createInvoiceSchema[0].options = res.data.map(({ id, name }) => ({
        value: id,
        label: `${id} / ${name}`,
      }));
  }

  get isLoading() {
    return !this.createInvoiceSchema[0].options;
  }

  async save() {
    const value = this.form.value;
    const res = await handleRequestPg(() => {
      return this.invoiceService.uploadFile(value.backupFile[0]).pipe(
        switchMap((res) =>
          this.invoiceService.create({
            ...value,
            merchant: value.merchant.label.split(' / ')[1],
            merchantId: value.merchant.value,
            backupUrl: res.data,
          })
        )
      );
    }, true);
    if (res) this.goBack();
  }
}
