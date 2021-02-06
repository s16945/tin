import {Component} from '@angular/core';
import {AuthService} from './components/auth/service/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(public authService: AuthService,
              private location: Location) {
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
    alert('Wylogowano');
    this.location.back();
  }
}
