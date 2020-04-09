import {User} from './User.model';
import {LdResource} from './LdResource.model';
import {Instrument} from './Instrument.model';
import {Moment} from 'moment';
import * as moment from 'moment';

/**
 * Musician is a Music subresource;
 * Can't deserialize associated Music from here (Causes circular dependency)
 */
export class Musician extends LdResource implements Serializable<Musician> {
  id?: number;
  user?: string | User;
  music: string;
  instruments: string[] | Instrument[] = [];
  createdAt?: Moment;
  updatedAt?: Moment;

  constructor(obj?: any) {
    super(obj);
    this.deserialize(obj);
  }

  deserialize(input: any): Musician {
    if (typeof input === 'object') {
      if (input.id) { this.id = input.id; }
      if (input.user) {
        this.user = typeof input.user === 'string' ? input.user : new User(input.user);
      }
      if (input.instruments && input.instruments.length) {
        this.instruments = typeof input.instruments[0] === 'string'
          ? input.instruments
          : input.instruments.map(musician => new Instrument(musician));
      }
      this.music = input.music || null;
      if (input.createdAt) { this.createdAt = moment(input.createdAt); }
      if (input.updatedAt) { this.updatedAt = moment(input.updatedAt); }
    }

    return this;
  }

  toString(): string {
    return this.id.toString();
  }
}
