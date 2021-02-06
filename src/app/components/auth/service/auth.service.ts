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

  getUsername() {
    const token = localStorage.getItem('access_token');
    const parsedToken = this.parseJwt(token);
    return parsedToken.username;
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}
