import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { ObjectUtils } from 'src/app/utils/object.util';
import { filterPaymentQRSchema } from '../../configs/form-schema';
import { PaymentQR } from '../../interfaces/payment-qr.interface';
import { paymentQrColumns } from '../../configs/table-columns';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  title = 'Pagos QR';
  form = buildform(filterPaymentQRSchema);
  filterPaymentQRSchema = filterPaymentQRSchema;
  paymentQrColumns = paymentQrColumns;
  paymentsQR?: PaymentQR[];

  constructor() {}

  ngOnInit(): void {}

  filter() {
    const value = ObjectUtils.clear(this.form.value);
    console.log('value', value);
  }

  download() {}
}
