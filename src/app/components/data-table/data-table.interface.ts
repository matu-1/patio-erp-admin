export type TableColumn = {
  field: string;
  headerName: string;
  valueFormatter?: (value: any) => any;
};

export type TableColumns = TableColumn[];
