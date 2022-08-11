import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { facturaColumns } from '../../configs/table-columns';
import { Factura, QueryInvoice } from '../../interfaces/factura.interface';
import { FacturaService } from '../../services/factura.service';
import { invoiceFilterSchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { ObjectUtils } from 'src/app/utils/object.util';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  pageRoute = PAGE_ROUTE;
  facturas?: Factura[];
  facturaColumns = facturaColumns;
  invoiceFilterSchema = invoiceFilterSchema;
  filterForm = buildform(invoiceFilterSchema);
  query: QueryInvoice = { page: 0, limit: 20, length: 0 };

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    const filterValue = ObjectUtils.clear(this.filterForm.value);
    this.facturas = undefined;
    this.facturaService.getAll({ ...this.query, ...filterValue }).subscribe((res) => {
      this.facturas = res.data.records;
      this.query.length = res.data.totalRecords;
    });
  }

  getRowClass(value: any) {
    return `bg-${value.estado_cobro} bg-${value.estado_cliente}`;
  }

  isDisable({ pagado, incobrable }: Factura) {
    return (pagado != 'no' && pagado != 'parcial') || incobrable == 1;
  }

  hasPayment({ pagado, incobrable }: Factura) {
    return pagado != 'no' || incobrable == 1; //tienepago
  }

  changePage(pageEvent: PageEvent) {
    this.query.page = pageEvent.pageIndex;
    this.query.limit = pageEvent.pageSize;
    this.getInvoices();
  }

  filter() {
    this.getInvoices();
  }
}
