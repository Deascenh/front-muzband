import {LdResource} from './LdResource.model';

export class User extends LdResource implements Serializable<User> {
  id?: string;
  email: string;
  username?: string;
  password?: string;
  roles?: string[];

  constructor(obj?: any) {
    super(obj);
    this.deserialize(obj);
  }

  deserialize(input: any): User {
    if (typeof input === 'object') {
      if (input.id) { this.id = input.id; }
      if (input.username) { this.username = input.username; }
      if (input.roles) { this.roles = input.roles; }
      this.email = input.email || null;
    }

    return this;
  }

  toString(): string {
    return this.email;
  }
}
