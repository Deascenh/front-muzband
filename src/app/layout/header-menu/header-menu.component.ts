import { Component, OnInit } from '@angular/core';
import {selectInstrumentList} from '../../core/store/instrument/instrument.selectors';
import {selectUserList} from '../../core/store/user/user.selectors';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {Observable} from 'rxjs';
import {Instrument, User} from '../../core/models';
import {InstrumentSheetComponent} from '../../shared/instrument-sheet/instrument-sheet.component';
import {UserSheetComponent} from '../../shared/user-sheet/user-sheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

enum EMenuSections {
  Instruments = 'Instruments',
  Users = 'Users',
}

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
  menuSections = EMenuSections;

  menuInstrumentsState$: Observable<Instrument[]>;
  menuMembersState$: Observable<User[]>;

  constructor(
    private store: Store<IAppState>,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
    this.menuInstrumentsState$ = this.store.select(selectInstrumentList);
    this.menuMembersState$ = this.store.select(selectUserList);
  }

  openItemSheet(section: EMenuSections) {
    let component = null;
    switch (section) {
      case EMenuSections.Instruments: {
        component = InstrumentSheetComponent;
        break;
      }
      case EMenuSections.Users: {
        component = UserSheetComponent;
        break;
      }
    }
    this.bottomSheet.open(component);
  }

}
