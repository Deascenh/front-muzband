import {User} from './User.model';
import {LdResource} from './LdResource.model';
import {Music} from './Music.model';
import {Instrument} from './Instrument.model';
import {Moment} from 'moment';
import * as moment from 'moment';

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
      // TODO Try to deserialize Music from here produce a Circular dependency with Music.model.
      //  But read Music data from a Musician is an edge case we don't need. Find a way anyway
      this.music = typeof input.music === 'string' ? input.music : null;
      this.user = typeof input.user === 'string' ? input.user : new User(input.user);
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
