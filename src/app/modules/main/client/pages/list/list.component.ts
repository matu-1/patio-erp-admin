import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { ObjectUtils } from 'src/app/utils/object.util';
import { PaginationDto } from 'src/app/utils/pagination.dto';
import { routeParams } from 'src/app/utils/route-params';
import { clientFilterSchema } from '../../configs/form-schema';
import { clientColumns } from '../../configs/table-columns';
import { Client } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';

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
  status = {
    retirado: 'retirado',
    bloqueado: 'bloqueado',
  };
  form = buildform(clientFilterSchema);
  clientFilterSchema = clientFilterSchema;

  constructor(private clientService: ClientService, private router: Router) {}

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

  async download() {
    const query: PaginationDto = { page: 0, limit: 1000000000000, length: 0 };
    const filterValue = ObjectUtils.clear(this.form.value);
    const res = await handleRequestPg(
      () => this.clientService.getPaginated({ ...query, ...filterValue }),
      true
    );
    if (res) {
      ExcelUtils.download(res.data.records, 'clients');
    }
  }

  changePage(event: PageEvent) {
    this.query.page = event.pageIndex;
    this.query.limit = event.pageSize;
    this.getClients();
  }

  goEdit({ id }: Client) {
    this.router.navigateByUrl(routeParams(PAGE_ROUTE.CLIENT.EDIT, { id }));
  }

  goCreate(){
    this.router.navigateByUrl(PAGE_ROUTE.CLIENT.CREATE);
  }

  activate(client: Client) {}

  unlock(client: Client) {}

  remove(client: Client) {}

  lock(client: Client) {}
}
