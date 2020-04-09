import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {User} from '../../../core/models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../core/store/App/App.state';
import {selectAuthenticatedUser} from '../../../core/store/auth/auth.selectors';
import {Observable} from 'rxjs';
import {UserService} from '../../../core/data/user.service';
import {AppSnackbarService} from '../../../core/utils/app-snackbar.service';
import {samePasswords, SamePasswordsErrorStateMatcher} from '../../directives/validators/same-passwords.directive';
import {AppendToUsers, RemoveUser} from '../../../core/store/user/user.actions';
import {ConfirmOperationService} from '../../../core/utils/confirm-operation.service';
import {FetchAuthenticatedUserSuccess, Logout} from '../../../core/store/auth/auth.actions';

export interface UserSheetData {
  member: User | null;
}

@Component({
  selector: 'app-user-sheet',
  templateUrl: './user-sheet.component.html',
  styleUrls: ['./user-sheet.component.scss']
})
export class UserSheetComponent implements OnInit {
  passwordsMatcher = new SamePasswordsErrorStateMatcher();
  passwordHidden = true;
  confirmPasswordHidden = true;

  passwordsForm = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  }, {
    validators: samePasswords
  });

  userForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: this.passwordsForm,
  });
  readonly = true;

  private authenticatedUser$: Observable<User>;
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

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: UserSheetData,
    public bottomSheetRef: MatBottomSheetRef<UserSheetComponent>,
    private snackBar: AppSnackbarService,
    private store: Store<IAppState>,
    private userService: UserService,
    private confirmOperation: ConfirmOperationService,
  ) {
    if (data.member !== null) {
      this.member = data.member;
    }
    this.authenticatedUser$ = this.store.select(selectAuthenticatedUser);
  }

  ngOnInit() {
    this.setReadonly();
  }

  onSubmit() {
    const submittedUser: User = this.userForm.value;
    if (this.member) {
      submittedUser.id = this.member.id;
    } else {
      submittedUser.plainPassword = (submittedUser.password as any).password;
    }

    this.userService.save(submittedUser).subscribe(result => {
      if (result['@id']) {
        this.store.dispatch(new AppendToUsers(result));
        this.bottomSheetRef.dismiss();
      }
      if (this.member) {
        this.snackBar.displaySaveSuccess(result);
        this.store.dispatch(new FetchAuthenticatedUserSuccess(result));
      }
    });
  }

  delete() {
    const deleteOperation = this.userService.delete(this.member);
    const message = `${this.member.useName()}, souhaitez vous vraiment vous désinscrire ? \
     Vous ne pourrez plus accéder à l'application et vos données n'apparaitront plus.`;

    this.confirmOperation.confirmDelete(message, deleteOperation)
      .subscribe(result => {
        if (result.success && result.payload === null) {
          this.bottomSheetRef.dismiss();
          this.store.dispatch(new RemoveUser(this.member));
          this.store.dispatch(new Logout());
        }
      });
  }

  private setReadonly() {
    if (this.member) {
      this.authenticatedUser$.subscribe(user => {
        this.readonly = !(user['@id'] === this.member['@id']);
      });
    } else {
      this.readonly = false;
    }
  }

  private patchUserForm(value: User) {
    this.userForm.patchValue({
      ...(value.name && {name: value.name}),
      email: value.email,
    });
  }
}
