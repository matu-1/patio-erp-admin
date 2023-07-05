import { Component, OnInit } from '@angular/core';
import { handleRequestPg } from 'src/app/utils/handle-request';
import { ReportService } from '../../services/report.service';
import { ActivatedRoute } from '@angular/router';
import { DriverDto } from '../../interfaces/driver.interface';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { buildform } from 'src/app/components/text-field/text-field.util';
import {
  driverInfoSchema,
  editBankAccountInfoSchema,
} from '../../configs/form-schema';
import { paymentsDriverColumns } from '../../../collect-driver/configs/table-columns';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss'],
})
export class DriverDetailComponent implements OnInit {
  driver?: DriverDto;
  title = 'Detalle Driver';
  breadcrumbs: Breadcrumbs = [
    { path: PAGE_ROUTE.REPORT.DRIVERS, title: 'Drivers' },
    { path: '', title: this.title },
  ];
  formDriver = buildform(driverInfoSchema);
  driverInfoSchema = driverInfoSchema;
  formBankAccount = buildform(editBankAccountInfoSchema);
  editBankAccountInfoSchema = editBankAccountInfoSchema;
  paymentsDriverColumns = paymentsDriverColumns;

  constructor(
    private reportService: ReportService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => this.getDriver(params.id));
  }

  async getDriver(id: number) {
    const res = await handleRequestPg(() =>
      this.reportService.getDriverFullInfo(id)
    );
    if (res) {
      this.driver = res.data;
      this.formDriver.patchValue(res.data);
      this.formBankAccount.patchValue(res.data.bankAccount);
    }
  }
}
