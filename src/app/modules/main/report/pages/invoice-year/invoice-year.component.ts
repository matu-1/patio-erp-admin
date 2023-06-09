import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { ReportService } from '../../services/report.service';
import { invoiceByYearSchema } from '../../configs/form-schema';
import { InvoiceByYear } from '../../interfaces/invoice-by-year.interface';
import { invoiceByYearColumns } from '../../configs/table-columns';

@Component({
  selector: 'app-invoice-year',
  templateUrl: './invoice-year.component.html',
})
export class InvoiceYearComponent implements OnInit {
  invoiceByYearSchema = invoiceByYearSchema;
  form = buildform(invoiceByYearSchema);
  invoices?: InvoiceByYear[];
  invoiceByYearColumns = invoiceByYearColumns;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getPaymentDetail();
  }

  filter() {
    this.getPaymentDetail();
  }

  async getPaymentDetail() {
    this.invoices = undefined;
    const res = await handleRequest(() =>
      this.reportService.getInvoicesByYear(this.form.value?.year)
    );
    if (res) this.invoices = res.data;
  }

  download() {
    ExcelUtils.download(this.invoices!, 'invoices-by-year');
  }
}
