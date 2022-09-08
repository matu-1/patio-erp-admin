export interface AverageStatus {
  complete: number;
  dispatched: number;
  arrived: number;
  assigned: number;
  accepted: number;
  ready: number;
  canceled: number;
}

export type AverageStatusDto = {
  start: Date;
  end: Date;
  cityId?: number;
  merchantId?: number;
};

export type ParsedAverageStatus = {
  title: string;
  value: string;
  icon: string;
};
