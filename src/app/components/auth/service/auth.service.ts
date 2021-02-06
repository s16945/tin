import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiPath} from '../../../api/api-path';
import {AbstractService} from '../../../api/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService {

  login(username: string, password: string): Observable<boolean> {
    return super.post<{ token: string }>(ApiPath.LOGIN(), {email: username, password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  register(body: any) {
    return super.post(ApiPath.REGISTER, body);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
