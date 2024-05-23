export interface Merchant {
  id: number;
  name: string;
  city: string | null;
  latitude: number;
  longitude: number;
  max_distance: number;
  coverage_cell_id: string;
  createdAt: Date | null;
  updatedAt: Date;
  photo: string;
  state: string;
  address: string;
  phone: null | string;
  logo: null | string;
  categories: Category[] | null;
  groupChat: null | string;
  externalId: null | string;
  readyAssignment: number;
  orderCapacity: number;
  discountTip: number;
  timeReady: number;
  activateReady: number;
  orderType: number;
  photoBanner: null | string;
  commissionPercentage: number;
  pickupPercentage: number;
  coverageId: number;
  coverageReportId: number;
  clientId: number | null;
  hourStart: null;
  hourEnd: null;
  hasMenu: number;
  zoneId: number | null;
  topCategoryId: number | null;
  client: Client;
  topCategory: TopCategory;
}

export interface Generic {
  id: number;
  name: string;
}

export interface Category extends Generic {
  merchantCategoryId: number;
}

export interface Client extends Generic {}
export interface TopCategory extends Generic {}
