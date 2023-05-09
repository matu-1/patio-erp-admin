export interface Pagination<T> {
  lastPage: number;
  records: T;
  totalRecords: number;
}
