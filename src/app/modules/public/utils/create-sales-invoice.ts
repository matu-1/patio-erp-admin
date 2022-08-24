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
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#333' }],
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
        text: `${pdf.nombre} - ${pdf.ciudad}`,
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
    ],
    defaultStyle: {
      lineHeight: 1.3,
    },
    styles: {
      logo: { margin: [0, 0, 0, 12] },
      title: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 8],
      },
      subtitle: {
        bold: true,
      },
      paragraph: {
        margin: [0, 0, 0, 8],
      },
    },
    images: { logo },
  };
  pdfMake.createPdf(docDefinition).open();
}
