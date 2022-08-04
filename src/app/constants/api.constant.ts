import { environment } from "src/environments/environment"

const API_URL = environment.apiUrl;

export const API = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    RENEW: `${API_URL}/auth/renew`,
  },
  INVOICE: {
    GET_ALL: `${API_URL}/factura`,
  }
}