import {User} from './User.model';
import {LdResource} from './LdResource.model';
import {Musician} from './Musician.model';
import {Moment} from 'moment';
import * as moment from 'moment';

export class Music extends LdResource implements Serializable<Music> {
  id?: number;
  title: string;
  artist: string;
  creator: string | User;
  musicians?: string[] | Musician[];
  createdAt?: Moment;
  updatedAt?: Moment;

  constructor(obj?: any) {
    super(obj);
    this.deserialize(obj);
  }

  deserialize(input: any): Music {
    if (typeof input === 'object') {
      if (input.id) { this.id = input.id; }
      this.title = input.title || null;
      this.artist = input.artist || null;
      this.creator = typeof input.creator === 'string' ? input.creator : new User(input.creator);
      if (input.musicians && input.musicians.length) {
        this.musicians = typeof input.musicians[0] === 'string'
        ? input.musicians
        : input.musicians.map(musician => new Musician(musician));
      }
      if (input.createdAt) { this.createdAt = moment(input.createdAt); }
      if (input.updateAt) { this.updatedAt = moment(input.updatedAt); }
    }

    return this;
  }

  toString(): string {
    return this.title;
  }
}
