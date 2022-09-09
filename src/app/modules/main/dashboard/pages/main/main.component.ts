import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DateUtils } from 'src/app/utils/date.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { ObjectUtils } from 'src/app/utils/object.util';
import { averageFilter } from '../../configs/form-schema';
import { ParsedAverageStatus } from '../../interfaces/average-status.interface';
import { DashboardService } from '../../services/dashboard.service';
import { parseAverageStatus } from './main.constant';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  form = buildform(averageFilter);
  averageFilter = averageFilter;
  averagesStatus!: ParsedAverageStatus[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getAverageStatus();
    this.getCities();
    this.getMerchants();
  }

  async getAverageStatus() {
    const value = ObjectUtils.clear(this.form.value);
    const res = await handleRequest(() =>
      this.dashboardService.getAverageStatus({
        end: DateUtils.getMaxHour(value.end),
        ...(value as any),
      })
    );
    if (res) this.averagesStatus = parseAverageStatus(res.data);
  }

  async getCities() {
    const res = await handleRequest(() => this.dashboardService.getCities());
    if (res)
      averageFilter[2].options = [
        { label: 'All', value: undefined },
        ...res.data.map((city) => ({
          value: city.id,
          label: city.name,
        })),
      ];
  }

  async getMerchants() {
    const res = await handleRequest(() => this.dashboardService.getMerchants());
    if (res)
      averageFilter[3].options = [
        { label: 'All', value: undefined },
        ...res.data.map((merchant) => ({
          value: merchant.id,
          label: merchant.name,
        })),
      ];
  }

  get isLoadingFilter() {
    return (
      !Boolean(averageFilter[2].options) || !Boolean(averageFilter[3].options)
    );
  }

  filter() {
    this.getAverageStatus();
  }
}
