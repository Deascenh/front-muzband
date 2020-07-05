import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {distinctUntilChanged, takeWhile, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {IAppState} from './core/store/App/App.state';
import {selectAuthState} from './core/store/auth/auth.selectors';
import {selectAppRouter} from './core/store/App/App.selectors';
import {IAuthState} from './core/store/auth/auth.state';
import {Observable} from 'rxjs';
import {Music, User} from './core/models';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddMusicDialogComponent} from './shared/components/add-music-dialog/add-music-dialog.component';
import {selectSidenavMusics} from './core/store/music/music.selectors';
import {GetFocusedMusic} from './core/store/music/music.actions';
import {MatSidenav} from '@angular/material/sidenav';

export enum EWidthModes {
  Small = 'small',
  Large = 'large',
}
export enum EOrientationModes {
  Portrait = 'portrait',
  Landscape = 'landscape',
}

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
  /**
   * !! BreakPoints Reference Table :
   * https://material.io/design/layout/responsive-layout-grid.html#breakpoints
   */
  private readonly largeHandsetPortrait = '599px';
  public readonly TOOLBAR_HEIGHT: number = 50;
  public widthMode: EWidthModes = null;
  public orientationMode: EOrientationModes = null;

  public sidenavMusicsState$: Observable<Music[]>;
  public isAuthenticated = false;
  public authenticatedUser: User = null;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private store: Store<IAppState>,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.mediaWidthObserver();
    this.mediaOrientationObserver();

    this.authState = this.store.select(selectAuthState);
    this.routerState = this.store.select(selectAppRouter);
    this.sidenavMusicsState$ = this.store.select(selectSidenavMusics);
  }

  ngOnInit(): void {
    this.initRouterStream();
    this.initAuthStream().subscribe();
  }

  private initAuthStream(): Observable<IAuthState> {
    return this.authState.pipe(
      distinctUntilChanged(),
      tap(state => {
        this.isAuthenticated = state.isAuthenticated;
        this.authenticatedUser = state.user;
      })
    );
  }

  private initRouterStream(): void {
    this.routerState.subscribe(state => {
      if (state) {
        const musicPageAsking = state.url.match(/^\/?music\/\d+$/g) && state.path.includes('music/:id');

        if (this.isAuthenticated && musicPageAsking) {
          this.store.dispatch(new GetFocusedMusic(parseInt(state.params.id, 10)));
        }
      }
    });
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
