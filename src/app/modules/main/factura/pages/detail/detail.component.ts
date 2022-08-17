import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { handleRequestPg } from 'src/app/utils/handle-request';
import { FacturaService } from '../../services/factura.service';
import { InvoiceInfo } from '../../interfaces/invoice-info.interface';
import { months } from 'src/app/constants/months.constant';
import { additionalServiceColumns, salesColumns } from '../../configs/table-columns';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  invoiceInfo?: InvoiceInfo;
  months = months;
  additionalServiceColumns = additionalServiceColumns;
  salesColumns = salesColumns;

  constructor(
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ code }) => {
      const id = Number(this.decodeCode(code).id);
      this.getInfo(id);
    });
  }

  async getInfo(id: number) {
    const res = await handleRequestPg(() => this.facturaService.getInfo(id));
    if (res) {
      this.invoiceInfo = res.data;
      this.invoiceInfo.id = id;
    }
  }

  decodeCode(code: string) {
    const data = window.atob(code);
    const dataArray = data.split('-');
    return {
      gestion: dataArray[0],
      mes: dataArray[1],
      id: dataArray[2],
      id_cliente: dataArray[3],
    };
  }

  getInvoiceDetails(isService = true) {
    return this.invoiceInfo?.invoiceDetails.filter((item) =>
      isService ? item.id_servicio != '11' : item.id_servicio == '11'
    );
  }
}
