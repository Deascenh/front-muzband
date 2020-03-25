import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {takeWhile} from 'rxjs/operators';
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
import {MusicService} from './core/data/music.service';

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
  /**
   * !! BreakPoints Reference Table :
   * https://material.io/design/layout/responsive-layout-grid.html#breakpoints
   */
  private readonly largeHandsetPortrait = '599px';

  public widthMode: EWidthModes = null;
  public orientationMode: EOrientationModes = null;
  public readonly TOOLBAR_HEIGHT: number = 50;

  public isAuthenticated = false;
  public authenticatedUser: User = null;
  public musics: Music[] = [];

  constructor(
    public breakpointObserver: BreakpointObserver,
    private store: Store<IAppState>,
    private router: Router,
    private dialog: MatDialog,
    private musicService: MusicService,
  ) {
    this.mediaWidthObserver();
    this.mediaOrientationObserver();

    this.authState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.authState.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.authenticatedUser = state.user;
    });
    this.fetchMusics();
  }

  logOut(): void {
    this.store.dispatch(new Logout());
  }

  goHome(): void {
    this.router.navigateByUrl('/home');
  }

  openAddMusicDialog(): void {
    const dialogRef = this.dialog.open(AddMusicDialogComponent, {
      width: this.largeHandsetPortrait,
      data: {
        creator: this.authenticatedUser,
        musicCount: this.musics.length,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.info('The new music is : ', result);
      }
    });
  }

  private fetchMusics(): void {
    this.musicService.getAll().subscribe(result => {
      this.musics = result['hydra:member'];
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
