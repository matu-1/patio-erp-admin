export type TableColumn<T = any> = {
  field: string;
  headerName: string;
  valueFormatter?: (value: T) => any;
};

export type TableColumns<T = any> = TableColumn<T>[];
