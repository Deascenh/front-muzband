import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {User} from '../../core/models';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface UserSheetData {
  member: User | null;
}

@Component({
  selector: 'app-user-sheet',
  templateUrl: './user-sheet.component.html',
  styleUrls: ['./user-sheet.component.scss']
})
export class UserSheetComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  private pHydrated: User;

  get member(): User {
    return this.pHydrated;
  }

  set member(value: User) {
    if (value instanceof User) {
      this.pHydrated = value;
      this.patchUserForm(value);
    }
  }


  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: UserSheetData) {
    if (data.member !== null) {
      this.member = data.member;
    }
  }

  ngOnInit() {
  }

  private patchUserForm(value: User) {
    this.userForm.patchValue({
      name: value.name,
      email: value.email,
    });
  }
}
