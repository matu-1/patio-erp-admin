import { Component, OnInit } from '@angular/core';
import { driverColumns } from '../../configs/table-columns';
import { DriverDto } from '../../interfaces/driver.interface';
import { ReportService } from '../../services/report.service';
import { handleRequest } from 'src/app/utils/handle-request';
import { routeParams } from 'src/app/utils/route-params';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { Location } from '@angular/common';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
})
export class DriversComponent implements OnInit {
  title = 'Drivers';
  drivers?: DriverDto[];
  driversColumns = driverColumns;

  constructor(
    private reportService: ReportService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDrivers();
  }

  async getDrivers() {
    this.drivers = undefined;
    const res = await handleRequest(() => this.reportService.getDrivers());
    if (res) this.drivers = res.data;
  }

  goDetail({ id }: DriverDto) {
    const url = this.location.prepareExternalUrl(
      routeParams(PAGE_ROUTE.REPORT.DRIVER_DETAIL, { id })
    );
    window.open(url, '_bank');
  }

}
