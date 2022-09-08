import { environment } from 'src/environments/environment';
import { skipToken } from '../interceptors/token.interceptor';

export const PATIO_STORE_CONFIG_HTTP = {
  context: skipToken(),
  headers: {
    Authorization: `Bearer ${environment.patioStoreToken}`,
  },
};
