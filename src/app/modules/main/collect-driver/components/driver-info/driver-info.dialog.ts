import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Driver } from 'src/app/modules/public/interfaces/driver.interface';
import { handleRequest } from 'src/app/utils/handle-request';
import { PaymentDriver } from '../../interfaces/payment-driver.interface';
import { CollectDriverService } from '../../services/collect-driver.service';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.dialog.html',
  styleUrls: ['./driver-info.dialog.scss'],
})
export class DriverInfoDialog implements OnInit {
  driver?: Driver;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: PaymentDriver,
    private collectDriverService: CollectDriverService
  ) {}

  ngOnInit(): void {
    this.getDriver();
  }

  async getDriver() {
    const res = await handleRequest(() =>
      this.collectDriverService.getDriver(this.data.driverId)
    );
    if (res) this.driver = res.data;
  }
}
