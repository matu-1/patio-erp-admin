import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { facturaColumns } from '../../configs/table-columns';
import {
  Factura,
  QueryInvoice,
  RevertPaymentDto,
} from '../../interfaces/factura.interface';
import { FacturaService } from '../../services/factura.service';
import { invoiceFilterSchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { ObjectUtils } from 'src/app/utils/object.util';
import { MatDialog } from '@angular/material/dialog';
import { RevertPaymentDialog } from '../../components/revert-payment/revert-payment.dialog';
import { handleRequest, handleRequestPg } from 'src/app/utils/handle-request';
import { DIALOG_CONFIG_XS } from 'src/app/constants/dialog.constant';
import { PayDialog } from '../../components/pay/pay.dialog';
import { months } from 'src/app/constants/months.constant';
import { SchedulePaymentDto } from '../../interfaces/factura.interface';
import { SchedulePaymentDialog } from '../../components/schedule-payment/schedule-payment.dialog';

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

  constructor(
    private facturaService: FacturaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  async getInvoices() {
    const filterValue = ObjectUtils.clear(this.filterForm.value);
    this.facturas = undefined;
    const res = await handleRequest(() =>
      this.facturaService.getAll({ ...this.query, ...filterValue })
    );
    if (res) {
      this.facturas = res.data.records;
      this.query.length = res.data.totalRecords;
    }
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

  openRevertPaymentDlg(invoice: Factura) {
    const dialogRef = this.dialog.open(RevertPaymentDialog, DIALOG_CONFIG_XS);
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) this.revertPayment(invoice, data);
    });
  }

  async revertPayment(invoice: Factura, data: any) {
    const body: RevertPaymentDto = {
      invoiceId: invoice.id,
      lastPaymentId: invoice.id_ultimo_pago ?? 0,
      ...data,
    };
    const res = await handleRequestPg(
      () => this.facturaService.revertPayment(body),
      true
    );
    if (res) this.getInvoices();
  }

  openPayDlg(invoice: Factura) {
    const dialogRef = this.dialog.open(PayDialog, {
      ...DIALOG_CONFIG_XS,
      data: invoice,
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) this.pay(invoice, data);
    });
  }

  async pay(invoice: Factura, data: any) {
    const body = {
      ...data,
      id: invoice.id,
    };
    const res = await handleRequestPg(
      () => this.facturaService.pay(body),
      true
    );
    if (res) this.getInvoices();
  }

  sendMessageWhatsApp(invoice: Factura) {
    const code = window.btoa(
      `${invoice.gestion}-${invoice.mes}-${invoice.id}-${invoice.id_cliente}`
    );
    const link = `http://api.whatsapp.com/send?phone=591${
      invoice.telefono
    }&text=Estimado%20cliente%20sirvase%20encontrar%20su%20recibo%20correspondiente%20a%20${
      months[invoice.mes - 1]
    }%20${
      invoice.gestion
    },%20a%20través%20del%20siguiente%20link:%0A%0Ahttp://labs.patio.com.bo/recibo/${code}`;
    window.open(link, '_blank');
  }

  sendMessageEmail(invoice: Factura) {
    const code = window.btoa(
      `${invoice.gestion}-${invoice.mes}-${invoice.id}-${invoice.id_cliente}`
    );
    const link = `http://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${
      invoice.email
    }&su=[PATIO%20SERVICE]%20Recibo%20${months[invoice.mes - 1]}%20${
      invoice.gestion
    }%20&body=Estimado%20Cliente%2C%0A%0ASírvase%20encontrar%20su%20factura%20correspondiente%20a%20${
      months[invoice.mes - 1]
    }%20${
      invoice.gestion
    },%20a%20través%20del%20siguiente%20link:%0A%0Ahttp://labs.patio.com.bo/recibo/${code}%0A%0ASaludos`;
    window.open(link, '_blank');
  }

  openSchedulePaymentDlg(invoice: Factura) {
    const dialogRef = this.dialog.open(SchedulePaymentDialog, {
      ...DIALOG_CONFIG_XS,
      data: invoice,
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) this.schedulePayment(invoice, data);
    });
  }

  async schedulePayment(invoice: Factura, data: any) {
    const body: SchedulePaymentDto = {
      ...data,
      id_factura: invoice.id,
      id_pago: invoice.id_ultimo_pago ?? 0,
    };
    const res = await handleRequestPg(
      () => this.facturaService.schedulePayment(body),
      true
    );
    if (res) this.getInvoices();
  }
}
