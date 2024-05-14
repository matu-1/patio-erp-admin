import { formatDate, formatNumber } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { environment } from 'src/environments/environment';
import { PaymentMerchantPDF } from '../../main/factura/interfaces/invoice-detail.interface';
import { PAYMENT_MODE_ID } from 'src/app/constants/constant';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

export function createOrdersInvoicePDF(pdf: PaymentMerchantPDF) {
  const baseHref = environment.production ? '/admin/erp/' : '/';
  const logo = `${location.origin}${baseHref}assets/images/logo-ps.png`;

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        image: 'logo',
        fit: [130, 130],
        // height: 50,
        margin: [0, 0, 0, 10],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 1,
            lineColor: 'gray',
          },
        ],
        margin: [0, 0, 0, 15],
      },
      {
        text: 'Resumen de Pedidos',
        style: 'title',
      },
      {
        text: 'Email',
        style: 'subtitle',
      },
      {
        text: 'patioservicedelivery@gmail.com',
        link: 'patioservicedelivery@gmail.com',
        color: 'blue',
        style: 'paragraph',
      },
      {
        text: 'Nombre del local',
        style: 'subtitle',
      },
      {
        text: `${pdf.name} - ${pdf.city}`,
        style: 'paragraph',
      },
      {
        text: 'Fecha de Pedidos',
        style: 'subtitle',
      },
      {
        text: pdf.date,
        style: 'paragraph',
      },
      {
        text: 'Id Recibo',
        style: 'subtitle',
      },
      {
        text: pdf.invoiceId,
        style: 'paragraph',
      },
      {
        layout: 'noBorders',
        style: 'paragraph',
        fontSize: 10,
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', '*', '*', '*'],
          body: [
            [
              { text: 'Id Pedido', style: 'tableHeader' },
              { text: 'Fecha', style: 'tableHeader' },
              { text: 'Monto Pedido', style: 'tableHeader' },
              { text: 'Descuento', style: 'tableHeader' },
              { text: 'Comisión', style: 'tableHeader' },
              { text: 'Monto Neto', style: 'tableHeader' },
              { text: 'Metodo Pago', style: 'tableHeader' },
            ],
            ...pdf.orders.map((item) => [
              { text: item.id, style: 'tableCell' },
              {
                text: formatDate(item.createdAt, 'dd/MM/yyyy HH:mm', 'es'),
                style: 'tableCell',
              },
              {
                text: formatNumber(Number(item.total), 'es', '.2-2'),
                style: 'tableCell',
              },
              {
                text: formatNumber(0, 'es', '.2-2'),
                style: 'tableCell',
              },
              {
                text: `${formatNumber(
                  Number(item.commissionPercentage),
                  'es'
                )}%`,
                style: 'tableCell',
              },
              {
                text: formatNumber(Number(item.commissionAmount), 'es', '.2-2'),
                style: 'tableCell',
              },
              {
                text: PAYMENT_MODE_ID[item.paymentModeId],
                style: 'tableCell',
              },
            ]),
          ],
        },
      },
      {
        text: [
          {
            text: 'Monto Total a pagar(BOB): ',
            style: 'subtitle',
          },
          formatNumber(Number(pdf.commissionAmount), 'es', '.2-2'),
        ],
        style: 'paragraph',
      },
      {
        text: [
          {
            text: 'Impuestos(BOB): ',
            style: 'subtitle',
          },
          formatNumber(0, 'es', '.2-2'),
        ],
        style: 'paragraph',
      },
      {
        text: [
          {
            text: 'Monto total pedidos(BOB): ',
            style: 'subtitle',
          },
          formatNumber(Number(pdf.total), 'es', '.2-2'),
        ],
        style: 'paragraph',
      },
    ],
    defaultStyle: {
      lineHeight: 1.3,
    },
    styles: {
      title: {
        bold: true,
        fontSize: 14,
        margin: [0, 0, 0, 8],
      },
      paragraph: {
        margin: [0, 0, 0, 8],
      },
      subtitle: {
        bold: true,
      },
      tableHeader: {
        bold: true,
        color: 'white',
        fillColor: 'teal',
        margin: 2,
      },
      tableCell: {
        margin: 2,
      },
    },
    images: { logo },
  };
  pdfMake.createPdf(docDefinition).open();
}
