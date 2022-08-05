import { Component, OnInit } from '@angular/core';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { facturaColumns } from '../../configs/table-columns';
import { Factura } from '../../interfaces/factura.interface';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  pageRoute = PAGE_ROUTE;
  facturas?: Factura[];
  facturaColumns = facturaColumns;

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.facturas = undefined;
    this.facturaService.getAll().subscribe((res) => {
      console.log(res);
      this.facturas = res.data.records;
    });
  }

  getRowClass(value: any) {
    return `bg-${value.estado_cobro} bg-${value.estado_cliente}`;
  }
}
