import { Injectable } from '@angular/core';
import {selectInstrumentList} from '../../core/store/instrument/instrument.selectors';
import {selectUserList} from '../../core/store/user/user.selectors';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {Instrument, Musician, User} from '../../core/models';

@Injectable()
export class MusicianFormService {
  private instruments: Instrument[];
  private members: User[];

  constructor(private store: Store<IAppState>) {
    this.store.select(selectInstrumentList)
      .subscribe(instruments => this.instruments = instruments);
    this.store.select(selectUserList)
      .subscribe(users => this.members = users);
  }

  /**
   * Transforms the representation of a form musician
   * into a musician ready to be saved.
   *  TODO Ultra border line conversion, refine the solution
   *
   * @param { any } formValue
   * @return { Musician }
   */
  public static getSavableMusician(formValue: any): Musician {
    const newMusician = new Musician({
      music: formValue.music,
      instruments : [formValue.instrument['@id']],
    });
    if (formValue.user) {
      newMusician.user = formValue.user['@id'];
    }
    return newMusician;
  }

  /**
   * Returns the reference list of instruments
   * with the keyword in their name.
   *
   * @param { string } value
   * @return { Instrument[] }
   */
  instrumentFilter(value: string | Instrument): Instrument[] {
    const name = typeof value === 'string' ? value : value.name;
    return this.instruments.filter(option => {
      return option.name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
    });
  }

  /**
   * Returns the members reference list containing the
   * keyword sought either in their name or in their email.
   *
   * @param { string | User } value
   * @return { User[] }
   */
  memberFilter(value: string | User): User[] {
    let values = typeof value === 'string' ? [value] : [value.email, value.name];
    values = values.map(needle => needle ? needle.toLowerCase() : null);

    return this.members.filter(option => {
      const name = option.name ? option.name.toLowerCase() : '';
      const email = option.email.toLowerCase();
      return values.find(keyword => {
        return name.indexOf(keyword) >= 0 || email.indexOf(keyword) >= 0;
      });
    });
  }
}
