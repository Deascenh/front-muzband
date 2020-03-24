import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {takeWhile} from 'rxjs/operators';

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
export class AppComponent implements OnDestroy {
  @ViewChild('sidenav', { static: false }) sidenav;
  private alive = true;
  /**
   * !! BreakPoints Reference Table :
   * https://material.io/design/layout/responsive-layout-grid.html#breakpoints
   */
  private readonly largeHandsetPortrait = '599px';

  public widthMode: EWidthModes = null;
  public orientationMode: EOrientationModes = null;
  public readonly TOOLBAR_HEIGHT: number = 50;


  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  constructor(
    public breakpointObserver: BreakpointObserver
  ) {
    this.mediaWidthObserver();
    this.mediaOrientationObserver();
  }

  private mediaWidthObserver() {
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

  private mediaOrientationObserver() {
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
