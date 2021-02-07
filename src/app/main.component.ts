import {Component} from '@angular/core';
import {AuthService} from './components/auth/service/auth.service';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  currentLang = 'en';

  constructor(public authService: AuthService,
              private location: Location,
              private translateService: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use('en');
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
    alert('Wylogowano');
    this.location.back();
  }

  changeLanguage() {
    const newLang = this.currentLang === 'en' ? 'pl' : 'en';
    this.translateService.use(newLang);
    this.currentLang = newLang;
  }
}
