import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

export class ApiPath {

  // ATHLETES
  static ATHLETES_PATH = () => API_URL + 'athletes';
  static SINGLE_ATHLETE = (id) => ApiPath.ATHLETES_PATH() + `/${id}`;

  // MANAGERS
  static MANAGERS_PATH = () => API_URL + 'managers';
  static SINGLE_MANAGER = (id) => ApiPath.MANAGERS_PATH() + `/${id}`;

  // TRANSFERS
  static TRANSFERS_PATH = () => API_URL + 'transfers';
  static SINGLE_TRANSFER = (id) => ApiPath.TRANSFERS_PATH() + `/${id}`;
}
