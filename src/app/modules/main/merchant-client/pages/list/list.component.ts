import { Component, OnInit } from '@angular/core';
import { clientColumns } from '../../configs/table-columns';
import { PaginationDto } from 'src/app/utils/pagination.dto';
import { Client } from '../../interfaces/client.interface';
import { ObjectUtils } from 'src/app/utils/object.util';
import { MerchantClientService } from '../../services/merchant-client.service';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { clientFilterSchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { PageEvent } from '@angular/material/paginator';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { Router } from '@angular/router';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { routeParams } from 'src/app/utils/route-params';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  title = 'Clientes';
  clients?: Client[];
  query: PaginationDto = { page: 0, limit: 20, length: 0 };
  clientColumns = clientColumns;
  clientFilterSchema = clientFilterSchema;
  form = buildform(clientFilterSchema);

  constructor(
    private clientService: MerchantClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  async getClients() {
    this.clients = undefined;
    const filter = ObjectUtils.clear(this.form.value);
    const res = await handleRequest(() =>
      this.clientService.getPaginated({ ...this.query, ...filter })
    );
    if (res) {
      this.clients = res.data.records;
      this.query.length = res.data.totalRecords;
    }
  }

  filter() {
    this.getClients();
  }

  goCreate() {
    this.router.navigateByUrl(PAGE_ROUTE.MERCHANT_CLIENT.CREATE);
  }

  goEdit({ id }: Client) {
    this.router.navigateByUrl(
      routeParams(PAGE_ROUTE.MERCHANT_CLIENT.EDIT, { id })
    );
  }

  async download() {
    const query: PaginationDto = { page: 0, limit: 1000000000000, length: 0 };
    const filterValue = ObjectUtils.clear(this.form.value);
    const res = await handleRequestPg(
      () => this.clientService.getPaginated({ ...query, ...filterValue }),
      true
    );
    if (res) ExcelUtils.download(res.data.records, 'merchant-clients');
  }

  changePage(event: PageEvent) {
    this.query.page = event.pageIndex;
    this.query.limit = event.pageSize;
    this.getClients();
  }
}
