import { TableColumns } from "src/app/components/data-table/data-table.interface";

export const clientColumns: TableColumns = [
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
      field: 'actions',
      headerName: 'Acciones'
    }
  ];
  