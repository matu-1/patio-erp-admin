import { Response } from '../utils/response';

export const CONFIG = {
  CITY_EEUU: 6,
  CITIES: {
    EEUU: 6,
    PHILADELPHIA: 9,
  },
  TZ: {
    EE_UU: 'America/New_York',
    BOLIVIA: 'America/La_Paz',
  },
};

export const responseBank: Response<boolean> = {
  data: true,
  message: 'Ok',
  status: 200,
};
