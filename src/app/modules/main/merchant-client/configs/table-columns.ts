import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { Client } from '../interfaces/client.interface';

export const clientColumns: TableColumns<Client> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'name',
    headerName: 'Nombre',
  },
  {
    field: 'email',
    headerName: 'Correos',
  },
  {
    field: 'phone',
    headerName: 'Telefonos',
  },
  // {
  //   field: 'webhookUrl',
  //   headerName: 'Ciudad',
  // },
  {
    field: 'collectorName',
    headerName: 'Cobrador',
  },
  {
    field: 'actions',
    headerName: 'Acciones',
  },
];
