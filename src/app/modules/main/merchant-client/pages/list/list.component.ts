import { Component, OnInit } from '@angular/core';
import { clientColumns } from '../../configs/table-columns';
import { PaginationDto } from 'src/app/utils/pagination.dto';
import { Client } from '../../interfaces/client.interface';
import { ObjectUtils } from 'src/app/utils/object.util';
import { MerchantClientService } from '../../services/merchant-client.service';
import { handleRequest } from 'src/app/utils/handle-request';
import { clientFilterSchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { PageEvent } from '@angular/material/paginator';

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

  constructor(private clientService: MerchantClientService) {}

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

  goCreate() {}

  download() {}

  changePage(event: PageEvent) {
    this.query.page = event.pageIndex;
    this.query.limit = event.pageSize;
    this.getClients();
  }
}
