import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ordersColumns, timingsColumns } from '../../configs/table-columns';
import { HoursWorkedDriver } from '../../interfaces/hours-worked-driver.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.dialog.html',
  styleUrls: ['./detail.dialog.scss'],
})
export class DetailDialog implements OnInit {
  ordersColumns = ordersColumns;
  timingsColumns = timingsColumns;

  constructor(@Inject(MAT_DIALOG_DATA) public data: HoursWorkedDriver) {}

  ngOnInit(): void {}
}
