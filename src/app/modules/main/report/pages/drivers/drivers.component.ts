import { Component, OnInit } from '@angular/core';
import { driversColumns } from '../../configs/table-columns';
import { DriverDto } from '../../interfaces/driver.interface';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent implements OnInit {
  title = 'Drivers';
  drivers?: DriverDto[] = [];
  driversColumns = driversColumns;

  constructor() {}

  ngOnInit(): void {}

  getAll() {}
}
