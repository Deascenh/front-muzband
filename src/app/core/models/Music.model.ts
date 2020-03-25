import {User} from './User.model';
import {LdResource} from './LdResource.model';

export class Music extends LdResource implements Serializable<Music> {
  id?: string;
  title: string;
  creator: string | User;
  createdAt?: string;
  updatedAt?: string;

  constructor(obj?: any) {
    super(obj);
    this.deserialize(obj);
  }

  deserialize(input: any): Music {
    if (typeof input === 'object') {
      if (input.id) { this.id = input.id; }
      this.title = input.title || null;
      this.creator = typeof input.creator === 'string' ? input.creator : new User(input.creator);
    }

    return this;
  }
}
