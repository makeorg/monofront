import { AxiosResponse } from 'axios';
import { ApiService } from '@make.org/api/ApiService';

const PATH_POST_CHECK_HASH = '/security/secure-hash';

export default class SecurityService {
  static checkSecureHash(
    hash: string,
    value: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_POST_CHECK_HASH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        hash,
        value,
      }),
    });
  }
}
