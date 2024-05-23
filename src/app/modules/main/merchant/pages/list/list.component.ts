import { Component, OnInit } from '@angular/core';
import { merchantColumns } from '../../configs/table-columns';
import { Merchant } from '../../interfaces/merchant';
import { handleRequest } from 'src/app/utils/handle-request';
import { MerchantService } from '../../services/merchant.service';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { Router } from '@angular/router';
import { routeParams } from 'src/app/utils/route-params';
import { ExcelUtils } from 'src/app/utils/excel.util';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  title = 'Comercios';
  merchants?: Merchant[];
  merchantColumns = merchantColumns;

  constructor(
    private merchantService: MerchantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMerchants();
  }

  async getMerchants() {
    this.merchants = undefined;
    const res = await handleRequest(() => this.merchantService.getAll());
    if (res) this.merchants = res.data;
  }

  filter() {
    this.getMerchants();
  }

  goCreate() {
    this.router.navigateByUrl(PAGE_ROUTE.MERCHANT.CREATE);
  }

  goEdit({ id }: Merchant) {
    this.router.navigateByUrl(routeParams(PAGE_ROUTE.MERCHANT.EDIT, { id }));
  }

  download() {
    ExcelUtils.download(this.merchants!, 'merchants');
  }
}
