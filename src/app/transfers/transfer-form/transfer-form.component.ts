import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  dateAfterOtherDateValidator,
  dateValidator,
  numberRangeValidator,
  numberValidator,
  selectionValidator
} from '../../util/form/validator/common-validator';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html'
})
export class TransferFormComponent implements OnInit {

  transferForm: FormGroup;
  contractDatesGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.contractDatesGroup = new FormGroup({
      contractStartDate: new FormControl('', [Validators.required, dateValidator()]),
      contractEndDate: new FormControl('', [Validators.required, dateValidator()]),
    }, [dateAfterOtherDateValidator('contractStartDate', 'contractEndDate')]);

    this.transferForm = new FormGroup({
      athleteName: new FormControl('',
        [Validators.required, selectionValidator()]),
      managerName: new FormControl('', [Validators.required, selectionValidator()]),
      currentClub: new FormControl('', [Validators.required]),
      newClub: new FormControl('', [Validators.required, selectionValidator()]),
      transferDate: new FormControl('', [Validators.required, dateValidator()]),
      price: new FormControl('', [Validators.required, numberValidator()]),
      commission: new FormControl('', [Validators.required, numberRangeValidator(0, 100)]),
      isLoan: new FormControl(''),
      contractDatesGroup: this.contractDatesGroup
    });
  }

  onSubmit() {
    this.transferForm.markAllAsTouched();

    // do submit
  }
}
