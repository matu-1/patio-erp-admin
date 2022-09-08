import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DateUtils } from 'src/app/utils/date.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { ObjectUtils } from 'src/app/utils/object.util';
import { averageFilter } from '../../configs/form-schema';
import {
  AverageStatus,
  ParsedAverageStatus,
} from '../../interfaces/average-status.interface';
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
      averageFilter[2].options = res.data.map((city) => ({
        value: city.id,
        label: city.name,
      }));
  }

  get isLoadingFilter() {
    return !Boolean(averageFilter[2].options);
  }

  filter() {
    this.getAverageStatus();
  }
}
