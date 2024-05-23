import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { Merchant } from '../interfaces/merchant';

export const merchantColumns: TableColumns<Merchant> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'name',
    headerName: 'Nombre',
  },
  {
    field: 'city',
    headerName: 'Ciudad',
  },
  {
    field: 'photo',
    headerName: 'Foto',
  },
  {
    field: 'address',
    headerName: 'Dirección',
  },
  {
    field: 'phone',
    headerName: 'Teléfono',
  },
  {
    field: 'categories',
    headerName: 'Categorias',
    valueFormatter: (v) => v.categories?.map((item) => item.name).join(', '),
  },
  {
    field: 'client',
    headerName: 'Cliente',
    valueFormatter: (v) =>
      v.client ? `${v.client.id} - ${v.client.name}` : '---',
  },
  {
    field: 'topCategory',
    headerName: 'Categoria Top',
    valueFormatter: (v) =>
      v.topCategory ? `${v.topCategory.id} - ${v.topCategory.name}` : '---',
  },
  {
    field: 'commissionPercentage',
    headerName: 'P. Comisión',
  },
  {
    field: 'actions',
    headerName: 'Acciones',
  },
];
