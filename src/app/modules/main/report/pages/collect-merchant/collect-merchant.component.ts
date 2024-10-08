import { Component, OnInit } from '@angular/core';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { collectMerchantSchema } from '../../configs/form-schema';
import {
  collectMerchantColumns,
  collectMerchantReportColumns,
} from '../../configs/table-columns';
import { CollectMerchantDto } from '../../interfaces/collect-merchant.interface';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-collect-merchant',
  templateUrl: './collect-merchant.component.html',
})
export class CollectMerchantComponent implements OnInit {
  title = 'Cobro Comercio';
  form = buildform(collectMerchantSchema);
  collectMerchantSchema = collectMerchantSchema;
  collectMerchants?: CollectMerchantDto[] = [];
  collectMerchantColumns = collectMerchantColumns;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getMerchants();
  }

  async getCollectMerchants() {
    this.collectMerchants = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.reportService.getCollectMerchants({
        ...value,
        merchants: value.merchants.value,
        end: DateUtils.getMaxHour(value.end),
      })
    );
    if (res) this.collectMerchants = res.data;
  }

  async getMerchants() {
    const res = await handleRequest(() => this.reportService.getMerchants());
    if (res)
      this.collectMerchantSchema[2].options = res.data.map(({ id, name }) => ({
        value: id,
        label: `${id} - ${name}`,
      }));
  }

  get isLoading() {
    return !this.collectMerchantSchema[2].options;
  }

  filter() {
    this.getCollectMerchants();
  }

  download() {
    ExcelUtils.download(
      parseByColumns(this.collectMerchants!, collectMerchantReportColumns),
      this.title
    );
  }
}
