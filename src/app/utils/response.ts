import { Pagination } from "./pagination";

export interface Response<T> {
  data: T;
  status: number;
  message: string;
}

export interface ResponsePagination<T> {
  data: Pagination<T>;
  status: number;
  message: string;
}
