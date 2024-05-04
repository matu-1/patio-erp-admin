import { Component, OnInit } from '@angular/core';
import { InvoiceData } from '../../interfaces/order-invoice';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { ReportService } from '../../services/report.service';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { handleRequest } from 'src/app/utils/handle-request';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { merchantCommissionFilterSchema } from '../../configs/form-schema';
import { merchantCommissionColumns } from '../../configs/table-columns';

@Component({
  selector: 'app-merchant-commission',
  templateUrl: './merchant-commission.component.html',
  styleUrls: ['./merchant-commission.component.scss'],
})
export class MerchantCommissionComponent implements OnInit {
  title = 'Comisión comercio';
  data?: InvoiceData[];
  merchantCommissionColumns = merchantCommissionColumns;
  merchantCommissionFilterSchema = merchantCommissionFilterSchema;
  form = buildform(merchantCommissionFilterSchema);

  constructor(
    private reportService: ReportService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getCities();
    this.getInvoicesData();
  }

  async getInvoicesData() {
    this.data = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.reportService.getInvoicesData({
        ...value,
        endDate: DateUtils.getMaxHour(value.end),
      })
    );
    console.log('data', res?.data);
    if (res) this.data = res.data;
  }

  async getCities() {
    const res = await handleRequest(() => this.dashboardService.getCities());
    if (res)
      merchantCommissionFilterSchema[2].options = [
        { label: 'All', value: undefined },
        ...res.data.map((city) => ({ label: city.name, value: city.id })),
      ];
  }

  get isLoadingFilter() {
    return !merchantCommissionFilterSchema[2].options;
  }

  filter() {
    this.getInvoicesData();
  }

  download() {
    ExcelUtils.download(
      parseByColumns(this.data!, merchantCommissionColumns),
      'comision-comercio'
    );
  }
}
