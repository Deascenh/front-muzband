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
  music: string;
  user: string | User;
  instruments: string[] | Instrument[];
  createdAt?: Moment;
  updatedAt?: Moment;

  constructor(obj?: any) {
    super(obj);
    this.deserialize(obj);
  }

  deserialize(input: any): Musician {
    if (typeof input === 'object') {
      if (input.id) { this.id = input.id; }
      this.user = typeof input.user === 'string' ? input.user : new User(input.user);
      this.music = input.music || null;
      this.instruments = input.instruments || [];
      if (input.createdAt) { this.createdAt = moment(input.createdAt); }
      if (input.updateAt) { this.updatedAt = moment(input.updatedAt); }
    }

    return this;
  }

  toString(): string {
    return this.id.toString();
  }
}
