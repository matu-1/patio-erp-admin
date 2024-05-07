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
import { routeParams } from 'src/app/utils/route-params';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { Location } from '@angular/common';

@Component({
  selector: 'app-merchant-commission',
  templateUrl: './merchant-commission.component.html',
  styleUrls: ['./merchant-commission.component.scss'],
})
export class MerchantCommissionComponent implements OnInit {
  title = 'Comisión comercios';
  data?: InvoiceData[];
  merchantCommissionColumns = merchantCommissionColumns;
  merchantCommissionFilterSchema = merchantCommissionFilterSchema;
  form = buildform(merchantCommissionFilterSchema);

  constructor(
    private reportService: ReportService,
    private dashboardService: DashboardService,
    private location: Location
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
        endDate: DateUtils.getMaxHour(value.endDate),
      })
    );
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

  generateCode(invoice: InvoiceData) {
    const value = this.form.value;
    return window.btoa(
      `${value.startDate.toISOString()}*${DateUtils.getMaxHour(
        value.endDate
      ).toISOString()}*${invoice.clientId}`
    );
  }

  goDetail(invoice: InvoiceData) {
    const url = routeParams(PAGE_ROUTE.PUBLIC.MERCHANT_COMMISSION_DETAIL, {
      code: this.generateCode(invoice),
    });
    window.open(this.location.prepareExternalUrl(url), '_blank');
  }
}
