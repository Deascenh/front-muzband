import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {distinctUntilChanged, takeWhile, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {IAppState} from './core/store/App/App.state';
import {selectAuthState} from './core/store/auth/auth.selectors';
import {selectAppRouter} from './core/store/App/App.selectors';
import {IAuthState} from './core/store/auth/auth.state';
import {Observable, Subscription} from 'rxjs';
import {Music, User} from './core/models';
import {Logout} from './core/store/auth/auth.actions';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddMusicDialogComponent} from './shared/components/add-music-dialog/add-music-dialog.component';
import {selectSidenavMusics} from './core/store/music/music.selectors';
import {GetFocusedMusic, GetSidenavMusics} from './core/store/music/music.actions';
import {GetUsers} from './core/store/user/user.actions';
import {GetInstruments} from './core/store/instrument/instrument.actions';
import {ClockCountdownService} from './core/utils/clock-countdown.service';
import {MatSidenav} from '@angular/material/sidenav';

export enum EWidthModes {
  Small = 'small',
  Large = 'large',
}
export enum EOrientationModes {
  Portrait = 'portrait',
  Landscape = 'landscape',
}

// TODO Most part of the sidnav logic can be transfer in a new component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  private alive = true;
  private authState: Observable<IAuthState>;
  private routerState: Observable<any>;
  private sessionCountdownSub: Subscription = null;
  /**
   * !! BreakPoints Reference Table :
   * https://material.io/design/layout/responsive-layout-grid.html#breakpoints
   */
  private readonly largeHandsetPortrait = '599px';
  private readonly pagesWithoutAuthGuard = ['', '/', '/login'];
  public readonly TOOLBAR_HEIGHT: number = 50;
  public widthMode: EWidthModes = null;
  public orientationMode: EOrientationModes = null;

  public sidenavMusicsState$: Observable<Music[]>;
  public isAuthenticated = false;
  public authenticatedUser: User = null;
  public sessionCountDown: string;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private store: Store<IAppState>,
    private router: Router,
    private dialog: MatDialog,
    private clockCountdown: ClockCountdownService,
  ) {
    this.mediaWidthObserver();
    this.mediaOrientationObserver();

    this.authState = this.store.select(selectAuthState);
    this.routerState = this.store.select(selectAppRouter);
    this.sidenavMusicsState$ = this.store.select(selectSidenavMusics);
  }

  ngOnInit(): void {
    this.initRouterStream();
    this.initAuthStream()
      .subscribe(() => {
        if (this.authenticatedUser) {
          this.loadAppGlobalData();
        }
      });
  }

  private initAuthStream(): Observable<IAuthState> {
    return this.authState.pipe(
      distinctUntilChanged(),
      tap(state => {
        this.isAuthenticated = state.isAuthenticated;

        // /!\ Temporary fix /!\
        // TODO Debug ngrx-store-localstorage which
        //  don't want to deserialize authState.user in type User
        //  causes bug when sync in done between Ngrx Store and the LocalStorage.
        //  This sync is done when user lands on the app or at browser refreshes.
        // The following treatment prevent this bug when state.user a generic object
        if (!(state.user instanceof User) && state.user) {
          console.warn('Current User was instantiate outsite data service');
          this.authenticatedUser = new User(state.user);
        } else {
          this.authenticatedUser = state.user;
        }

        if (state.sessionTimeout !== null) {
          this.startSessionCountdown(state.sessionTimeout);
        }
      })
    );
  }

  private initRouterStream(): void {
    this.routerState.subscribe(state => {
      if (state) {
        const matches = state.url.match(/^\/?music\/\d+$/g);

        if (matches && state.path.includes('music/:id')) {
          this.store.dispatch(new GetFocusedMusic(parseInt(state.params.id, 10)));
        }
        if (!this.pagesWithoutAuthGuard.includes(state.url) && !this.authenticatedUser) {
          this.router.navigateByUrl('/');
        }
      }
    });
  }

  /**
   * Loads and stores global data shared between several components
   */
  private loadAppGlobalData(): void {
    this.store.dispatch(new GetSidenavMusics());
    this.store.dispatch(new GetUsers());
    this.store.dispatch(new GetInstruments());
  }

  private startSessionCountdown(untilTimeString: string): void {
    if (this.sessionCountdownSub === null) {
      this.sessionCountdownSub = this.clockCountdown.startUntil(untilTimeString)
        .pipe(takeWhile(() => this.alive))
        .subscribe(formattedTime => this.sessionCountDown = formattedTime);
    }
  }

  logOut(): void {
    this.store.dispatch(new Logout());
  }

  goHome(): void {
    this.router.navigateByUrl('/home');
  }

  openAddMusicDialog(): void {
    this.dialog.open(AddMusicDialogComponent, {
      width: this.largeHandsetPortrait,
      panelClass: 'app-dialog',
      data: { creator: this.authenticatedUser }
    });
  }

  private mediaWidthObserver(): void {
    this.breakpointObserver
      .observe([
        `(min-width: ${this.largeHandsetPortrait})`
      ]).pipe(
        takeWhile(() => this.alive)
      ).subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.info(`[-] > Over ${this.largeHandsetPortrait} Mode`);
          this.widthMode = EWidthModes.Large;
        } else {
          console.info(`[-] < Under ${this.largeHandsetPortrait} Mode`);
          this.widthMode = EWidthModes.Small;
        }
      });
  }

  private mediaOrientationObserver(): void {
    this.breakpointObserver
      .observe([
        '(orientation: portrait)',
        '(orientation: landscape)',
      ]).pipe(
        takeWhile(() => this.alive)
      ).subscribe((state: BreakpointState) => {
        switch (state.matches) {
          case state.breakpoints['(orientation: portrait)'] : {
            console.info('[-] Portrait Mode');
            this.orientationMode = EOrientationModes.Portrait;
            break;
          }
          case state.breakpoints['(orientation: landscape)'] : {
            console.info('[-] Landscape Mode');
            this.orientationMode = EOrientationModes.Landscape;
            break;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
