import {AbstractControl, ValidatorFn} from '@angular/forms';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return {invalidNumber: true};
    }

    return !isNaN(control.value) ? null : {invalidNumber: true};
  };
}

export function dateValidator() {
  const pattern = /(\d{4})-(\d{2})-(\d{2})/;

  return (control: AbstractControl): { [key: string]: any } | null => {
    return pattern.test(control.value) ? null : {invalidDate: true};
  };
}

export function selectionValidator() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value ? null : {invalidSelection: true};
  };
}

export function numberRangeValidator(min, max) {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const errorObj = {outOfRange: true};

    if (!control.value) {
      return null;
    }

    if (isNaN(control.value)) {
      return errorObj;
    }

    const value = parseFloat(control.value);
    if (value < min) {
      return errorObj;
    }
    return value <= max ? null : errorObj;
  };
}

export function dateAfterOtherDateValidator(dateFieldName1, dateFieldName2) {
  return (controlGroup: AbstractControl): { [key: string]: any } | null => {
    if (!controlGroup.get(dateFieldName1).value || !controlGroup.get(dateFieldName2).value) {
      return null;
    }

    const errorObj = {dateAfter: true};
    const date1 = controlGroup.get(dateFieldName1).value;
    const date2 = controlGroup.get(dateFieldName2).value;

    if (!date1) {
      return null;
    }
    if (!date2) {
      return null;
    }

    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(date1)) {
      return errorObj;
    }

    if (!pattern.test(date2)) {
      return errorObj;
    }

    const valueDate = new Date(date1);
    const compareToDate = new Date(date2);
    return valueDate.getTime() >= compareToDate.getTime() ? errorObj : null;
  };
}

export function passwordMatchValidator(passwordField1, passwordField2) {
  return (controlGroup: AbstractControl): { [key: string]: any } | null => {
    if (!controlGroup.get(passwordField1).value || !controlGroup.get(passwordField2).value) {
      return null;
    }

    const errorObj = {passmatch: true};
    const pass1 = controlGroup.get(passwordField1).value;
    const pass2 = controlGroup.get(passwordField2).value;


    return pass1 !== pass2 ? errorObj : null;
  };
}

