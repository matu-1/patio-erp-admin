import { Component, OnInit } from '@angular/core';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { Client } from '../../interfaces/client.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  title = 'Clientes';
  clients?: Client[];

  constructor() {}

  ngOnInit(): void {}

  download() {
    ExcelUtils.download(this.clients!, 'clients');
  }
}
