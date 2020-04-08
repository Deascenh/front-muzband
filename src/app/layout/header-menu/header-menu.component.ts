import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {selectMenuInstrumentList} from '../../core/store/instrument/instrument.selectors';
import {selectMenuUserList} from '../../core/store/user/user.selectors';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {Observable, Subscription} from 'rxjs';
import {Instrument, User} from '../../core/models';
import {InstrumentSheetComponent, InstrumentSheetData} from '../../shared/components/instrument-sheet/instrument-sheet.component';
import {UserSheetComponent, UserSheetData} from '../../shared/components/user-sheet/user-sheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {takeWhile} from 'rxjs/operators';
import {ClockCountdownService} from '../../core/utils/clock-countdown.service';
import {selectSessionTimeout} from '../../core/store/auth/auth.selectors';
import {Logout} from '../../core/store/auth/auth.actions';

enum EMenuSections {
  Instruments = 'Instruments',
  Users = 'Users',
}

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit, OnDestroy {
  alive = true;
  private pHydrated: User;

  @Input() set authenticatedUser(member: User) {
    if (member instanceof User) {
      this.pHydrated = member;
    }
  }

  get authenticatedUser(): User {
    return this.pHydrated;
  }

  menuSections = EMenuSections;
  menuInstrumentsState$: Observable<Instrument[]>;
  menuMembersState$: Observable<User[]>;


  private sessionCountdownSub: Subscription = null;
  sessionCountDown: string;

  constructor(
    private store: Store<IAppState>,
    private bottomSheet: MatBottomSheet,
    private clockCountdown: ClockCountdownService,
  ) {
  }

  ngOnInit() {
    this.menuInstrumentsState$ = this.store.select(selectMenuInstrumentList);
    this.menuMembersState$ = this.store.select(selectMenuUserList);
    this.store.select(selectSessionTimeout)
      .subscribe(sessionTimeout => {
        if (sessionTimeout !== null) {
          this.startSessionCountdown(sessionTimeout);
        }
      });
  }

  openItemSheet(section: EMenuSections, resource: Instrument | User = null) {
    let component = null;
    let data: UserSheetData | InstrumentSheetData | {} = {};
    switch (section) {
      case EMenuSections.Instruments: {
        component = InstrumentSheetComponent;
        data = { instrument: resource as Instrument };
        break;
      }
      case EMenuSections.Users: {
        component = UserSheetComponent;
        data = { member: resource as User };
        break;
      }
    }
    this.bottomSheet.open(component, {
      data,
      panelClass: 'app-bottom-sheet',
    });
  }

  logOut(): void {
    this.store.dispatch(new Logout());
  }

  private startSessionCountdown(untilTimeString: string): void {
    if (this.sessionCountdownSub === null) {
      this.sessionCountdownSub = this.clockCountdown.startUntil(untilTimeString)
        .pipe(takeWhile(() => this.alive))
        .subscribe(formattedTime => this.sessionCountDown = formattedTime);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
