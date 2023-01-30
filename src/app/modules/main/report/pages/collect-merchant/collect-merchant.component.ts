import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DateUtils } from 'src/app/utils/date.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { collectMerchantSchema } from '../../configs/form-schema';
import { collectMerchantColumns } from '../../configs/table-columns';
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
  collectMerchants: CollectMerchantDto[] = [];
  collectMerchantColumns = collectMerchantColumns;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getMerchants();
  }

  async getCollectMerchants() {
    const value = this.form.value;
    console.log('value', value);
    const res = await handleRequest(() =>
      this.reportService.getCollectMerchants({
        ...value,
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
}
