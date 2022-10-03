export interface Driver {
  id: number;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  rating: number;
  status: string;
  wallet: number;
  last_login: Date;
  app_version: string;
  device: string;
  referred_code: string;
  birthday: Date;
  last_latitude: string;
  last_longitude: string;
  last_sync: null;
  role: string;
  city_id: number;
  orderCapacity: number;
  timezone_id: number;
  photoUrl: null;
  contractUrl: string;
  signatureUrl: null;
  identityNumber: null;
  address: null;
  extraAmount: number;
  modalityId: number;
  paymentOption: number;
  warrantyAmount: number;
  bearing: number;
  jugnoId: null;
  createdAt: Date;
  updatedAt: Date;
  city: Ity;
  modality: Ity;
}

export interface Ity {
  name: string;
}
