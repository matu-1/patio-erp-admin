import { TableColumns } from './data-table.interface';

export default function parseByColumns<T>(
  data: T[],
  columns: TableColumns
): T[] {
  return data.map((item: any) => {
    const newObj: any = {};
    columns.forEach((column) => {
      newObj[column.headerName] = column.valueFormatter
        ? column.valueFormatter(item)
        : item[column.field];
    });
    return newObj;
  });
}
