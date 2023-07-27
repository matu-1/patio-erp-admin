import { Component, OnInit } from '@angular/core';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { InvoiceService } from '../../services/invoice.service';
import { invoiceColumns } from '../../configs/table-columns';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { invoiceFilterSchema } from '../../configs/form-schema';
import { DateUtils } from 'src/app/utils/date.util';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  title = 'Invoices';
  PAGE_ROUTE = PAGE_ROUTE;
  invoices?: any[];
  invoiceColumns = invoiceColumns;
  form = buildform(invoiceFilterSchema);
  invoiceFilterSchema = invoiceFilterSchema;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  async getInvoices() {
    this.invoices = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.invoiceService.getByRange({
        ...value,
        end: DateUtils.getMaxHour(value.end),
      })
    );
    if (res) this.invoices = res.data;
  }

  filter() {
    this.getInvoices();
  }

  download() {
    ExcelUtils.download(
      parseByColumns(this.invoices!, invoiceColumns),
      'invoices'
    );
  }

  goBackup(url: string) {
    window.open(url, '_bank');
  }
}
