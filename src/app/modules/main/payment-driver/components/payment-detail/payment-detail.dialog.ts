import { Component, Inject, OnInit } from '@angular/core';
import { handleRequest } from 'src/app/utils/handle-request';
import { paymentsColumns } from '../../configs/table-columns';
import { Payment } from '../../interfaces/payment.interface';
import { PaymentDriverService } from '../../services/payment-driver.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentDriver } from '../../../collect-driver/interfaces/payment-driver.interface';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.dialog.html',
  styleUrls: ['./payment-detail.dialog.scss'],
})
export class PaymentDetailDialog implements OnInit {
  paymentsColumns = paymentsColumns;
  payments?: Payment[];

  constructor(
    private paymentDriverService: PaymentDriverService,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDriver
  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  async getPayments() {
    const res = await handleRequest(() =>
      this.paymentDriverService.getPayments(this.data.id)
    );
    if (res) this.payments = res.data;
  }
}
