import {Component, OnInit} from '@angular/core';
import {User} from '../../core/models';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {Login, Logout} from '../../core/store/auth/auth.actions';
import {selectAuthState} from '../../core/store/auth/auth.selectors';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

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
    private jwtService: JwtHelperService,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    if (this.jwtService.isTokenExpired()) {
      this.store.dispatch(new Logout());
    }
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
