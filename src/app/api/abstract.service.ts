import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {

  protected constructor(private http: HttpClient) {
  }

  get<T>(address: string, parameters?: HttpParams) {
    return this.http.get<T>(address, this.generateDefaultOptions(parameters));
  }

  post<T>(address: string, body: any, parameters?: HttpParams) {
    return this.http.post<T>(address, body, this.generateDefaultOptions(parameters));
  }

  put<T>(address: string, body: any, parameters?: HttpParams) {
    return this.http.put<T>(address, body, this.generateDefaultOptions(parameters));
  }

  delete<T>(address: string, parameters?: HttpParams) {
    return this.http.delete<T>(address, this.generateDefaultOptions(parameters));
  }

  private generateDefaultOptions(parameters?: HttpParams) {
    const options: {
      headers: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    } = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('access_token')
      },
      params: parameters
    };

    return options;
  }
}
