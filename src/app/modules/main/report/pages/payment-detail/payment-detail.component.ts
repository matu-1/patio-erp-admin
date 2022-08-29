import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { paymentDetailSchema } from '../../configs/form-schema';
import { paymentDetailColumns } from '../../configs/table-columns';
import { PaymentDetail } from '../../interface/payment-detail.interface';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss'],
})
export class PaymentDetailComponent implements OnInit {
  paymentDetailSchema = paymentDetailSchema;
  form = buildform(paymentDetailSchema);
  paymentDetailList?: PaymentDetail[];
  paymentDetailColumns = paymentDetailColumns;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getPaymentDetail();
  }

  filter() {
    this.getPaymentDetail();
  }

  async getPaymentDetail() {
    this.paymentDetailList = undefined;
    const res = await handleRequest(() =>
      this.reportService.getPaymentDetail(this.form.value)
    );
    if (res) this.paymentDetailList = res.data;
  }

  download() {
    ExcelUtils.download(this.paymentDetailList!, 'payment-detail');
  }
}
