import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {distinctUntilChanged, takeWhile, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {IAppState} from './core/store/App/App.state';
import {selectAuthState} from './core/store/auth/auth.selectors';
import {IAuthState} from './core/store/auth/auth.state';
import {Observable} from 'rxjs';
import {Music, User} from './core/models';
import {Logout} from './core/store/auth/auth.actions';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddMusicDialogComponent} from './shared/add-music-dialog/add-music-dialog.component';
import {selectSidenavMusics} from './core/store/music/music.selectors';
import {GetSidenavMusics} from './core/store/music/music.actions';

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
  @ViewChild('sidenav', { static: false }) sidenav;
  private alive = true;
  private authState: Observable<IAuthState>;
  private sidenavState: Observable<Music[]>;
  /**
   * !! BreakPoints Reference Table :
   * https://material.io/design/layout/responsive-layout-grid.html#breakpoints
   */
  private readonly largeHandsetPortrait = '599px';
  public readonly TOOLBAR_HEIGHT: number = 50;

  public widthMode: EWidthModes = null;
  public orientationMode: EOrientationModes = null;

  public isAuthenticated = false;
  public authenticatedUser: User = null;
  public musics: Music[] = [];

  constructor(
    public breakpointObserver: BreakpointObserver,
    private store: Store<IAppState>,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.mediaWidthObserver();
    this.mediaOrientationObserver();

    this.authState = this.store.select(selectAuthState);
    this.sidenavState = this.store.select(selectSidenavMusics);
  }

  ngOnInit(): void {
    this.initAuthStream();
    this.initSidenavStream();
  }

  private initAuthStream(): void {
    this.authState.pipe(
      distinctUntilChanged(),
      tap(state => {
        this.isAuthenticated = state.isAuthenticated;
        this.authenticatedUser = state.user;
      })
    ).subscribe(() => {
      if (this.authenticatedUser) {
        this.store.dispatch(new GetSidenavMusics());
      }
    });
  }

  private initSidenavStream(): void {
    this.sidenavState.pipe(
      takeWhile(() => !!this.authenticatedUser)
    ).subscribe((musics: Music[]) => this.musics = musics);
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
      data: {
        creator: this.authenticatedUser,
        musicCount: this.musics.length,
      }
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
