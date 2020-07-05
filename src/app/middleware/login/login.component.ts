import {Component, OnInit} from '@angular/core';
import {User} from '../../core/models';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {Login} from '../../core/store/auth/auth.actions';
import {selectAuthState} from '../../core/store/auth/auth.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private store: Store<IAppState>,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    this.store.dispatch(new Login({
      username: this.user.username,
      password: this.user.password,
    }));
  }

}
