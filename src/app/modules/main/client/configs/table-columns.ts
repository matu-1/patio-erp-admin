import { TableColumns } from 'src/app/components/data-table/data-table.interface';

export const clientColumns: TableColumns = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
  },
  {
    field: 'email',
    headerName: 'Correos',
  },
  {
    field: 'telefono',
    headerName: 'Telefonos',
  },
  {
    field: 'ciudad',
    headerName: 'Ciudad',
  },
  {
    field: 'actions',
    headerName: 'Acciones'
  }
];
