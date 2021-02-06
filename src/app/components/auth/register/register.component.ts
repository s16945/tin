import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {dateValidator, numberValidator, passwordMatchValidator} from '../../../util/form/validator/common-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  passwordsGroup: FormGroup;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.passwordsGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    }, [passwordMatchValidator('password', 'repeatPassword')]);

    this.registerForm = new FormGroup({
      firstName: new FormControl('',
        [Validators.required, Validators.minLength(3),
          Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3),
        Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9),
        Validators.maxLength(9), numberValidator()]),
      careerStartDate: new FormControl('', [Validators.required, dateValidator()]),
      passwordsGroup: this.passwordsGroup
    });
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();

    if (!this.registerForm.valid) {
      return;
    }

    const rawForm = {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      phoneNumber: this.registerForm.get('phoneNumber').value,
      careerStartDate: this.registerForm.get('careerStartDate').value,
      password: this.registerForm.get('passwordsGroup').get('password').value,
    };

    this.auth.register(rawForm)
      .pipe(first())
      .subscribe(
        result => {
          alert('Pomyślnie zarejestrowano');
          this.router.navigate(['/login']);
        },
        err => console.log('Could not register:', err)
      );
  }
}
