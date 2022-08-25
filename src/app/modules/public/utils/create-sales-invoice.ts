import { formatDate, formatNumber } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { environment } from 'src/environments/environment';
import { PDF } from '../../main/factura/interfaces/invoice-info.interface';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

export function createSalesInvoice(pdf: PDF) {
  const baseHref = environment.production ? '/admin/erp/' : '/';
  const logo = `${location.origin}${baseHref}assets/images/logo-ps.png`;

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        image: 'logo',
        height: 50,
        fit: [130, 130],
        style: 'logo',
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
            lineColor: 'black',
          },
        ],
        margin: [0, 0, 0, 20],
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
        text: `${pdf.nombre} * ${pdf.ciudad}`,
        style: 'paragraph',
      },
      {
        text: 'Fecha de Pedidos',
        style: 'subtitle',
      },
      {
        text: pdf.fecha,
        style: 'paragraph',
      },
      {
        text: 'Id Recibo',
        style: 'subtitle',
      },
      {
        text: `${pdf.id_factura}`,
        style: 'paragraph',
      },
      {
        layout: 'headerLineOnly',
        style: 'paragraph',
        table: {
          headerRows: 1,
          body: [
            [
              { text: 'Id Pedido', style: 'tableHeader' },
              { text: 'Fecha', style: 'tableHeader' },
              { text: 'Fecha Hora', style: 'tableHeader' },
              { text: 'Monto Pedido', style: 'tableHeader' },
              { text: 'Descuento', style: 'tableHeader' },
              { text: 'Comisión', style: 'tableHeader' },
              { text: 'Monto Neto', style: 'tableHeader' },
              { text: 'Metodo Pago', style: 'tableHeader' },
            ],
            ...pdf.pdf_array.map((item) => [
              item.id_pedido,
              formatDate(item.fecha, 'dd/MM/yyyy', 'es'),
              formatDate(item.fecha_hora, 'dd/MM/yyyy HH:mm', 'es'),
              formatNumber(Number(item.monto), 'es', '.2-2'),
              formatNumber(0, 'es', '.2-2'),
              `${formatNumber(Number(item.porcentaje_comision), 'es')}%`,
              formatNumber(Number(item.monto_neto), 'es', '.2-2'),
              item.metodo_pago,
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
          formatNumber(Number(pdf.monto_neto_sum), 'es', '.2-2'),
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
          formatNumber(Number(pdf.monto_pedidos_sum), 'es', '.2-2'),
        ],
        style: 'paragraph',
      },
    ],
    defaultStyle: {
      lineHeight: 1.3,
    },
    styles: {
      logo: { margin: [0, 0, 0, 12] },
      title: {
        fontSize: 15,
        bold: true,
        margin: [0, 0, 0, 8],
      },
      subtitle: {
        bold: true,
      },
      paragraph: {
        margin: [0, 0, 0, 8],
      },
      tableHeader: {
        bold: true,
        color: 'black',
      },
    },
    images: { logo },
  };
  pdfMake.createPdf(docDefinition).open();
}
