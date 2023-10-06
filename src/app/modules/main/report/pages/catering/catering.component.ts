import { Component, OnInit } from '@angular/core';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { Catering } from '../../interfaces/catering.interface';
import { ReportService } from '../../services/report.service';
import { cateringColumns } from '../../configs/table-columns';
import { ordersCashFilterSchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DashboardService } from '../../../dashboard/services/dashboard.service';

@Component({
  selector: 'app-catering',
  templateUrl: './catering.component.html',
  styleUrls: ['./catering.component.scss'],
})
export class CateringComponent implements OnInit {
  title = 'Caterings';
  caterings?: Catering[];
  cateringColumns = cateringColumns;
  cateringFilterSchema = ordersCashFilterSchema;
  form = buildform(ordersCashFilterSchema);

  constructor(
    private reportService: ReportService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getCaterings();
    this.getCities();
  }

  async getCaterings() {
    this.caterings = undefined;
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.reportService.getCaterings({
        ...value,
        end: DateUtils.getMaxHour(value.end),
      })
    );
    if (res) this.caterings = res.data;
  }

  async getCities() {
    const res = await handleRequest(() => this.dashboardService.getCities());
    if (res)
      ordersCashFilterSchema[2].options = [
        { label: 'All', value: undefined },
        ...res.data.map((city) => ({ label: city.name, value: city.id })),
      ];
  }

  get isLoadingFilter() {
    return !ordersCashFilterSchema[2].options;
  }

  filter() {
    this.getCaterings();
  }

  download() {
    ExcelUtils.download(this.caterings!, 'caterings');
  }
}
