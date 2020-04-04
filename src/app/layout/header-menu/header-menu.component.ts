import {Component, OnInit} from '@angular/core';
import {selectMenuInstrumentList} from '../../core/store/instrument/instrument.selectors';
import {selectMenuUserList} from '../../core/store/user/user.selectors';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {Observable} from 'rxjs';
import {Instrument, User} from '../../core/models';
import {InstrumentSheetComponent, InstrumentSheetData} from '../../shared/components/instrument-sheet/instrument-sheet.component';
import {UserSheetComponent, UserSheetData} from '../../shared/components/user-sheet/user-sheet.component';
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
    this.menuInstrumentsState$ = this.store.select(selectMenuInstrumentList);
    this.menuMembersState$ = this.store.select(selectMenuUserList);
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

}
