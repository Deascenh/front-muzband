import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {FetchAuthenticatedUser, Logout} from '../../core/store/auth/auth.actions';
import {selectAuthState} from '../../core/store/auth/auth.selectors';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {takeWhile} from 'rxjs/operators';
import {User} from '../../core/models';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  getState: Observable<any>;
  alive = true;

  isAuthenticated = false;
  user: User = null;
  token = '';
  errorMessage = null;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private jwtService: JwtHelperService,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.pipe(
      takeWhile(() => this.alive),
    ).subscribe((state) => this.manageState(state));
  }

  private manageState(state: any) {
    this.isAuthenticated = state.isAuthenticated;
    this.user = state.user;
    this.errorMessage = state.errorMessage;
    this.token = this.jwtService.tokenGetter();

    if (!this.user && !this.jwtService.isTokenExpired()) {
      const id = this.jwtService.decodeToken().id;
      this.store.dispatch(new FetchAuthenticatedUser(id));
    }
    this.redirect();
  }

  private redirect() {
    if (this.jwtService.isTokenExpired()) {
      this.store.dispatch(new Logout());
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
