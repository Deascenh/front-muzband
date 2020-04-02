import {LdResource} from './LdResource.model';
import {Musician} from './Musician.model';

export class Instrument extends LdResource implements Serializable<Instrument> {
  id?: number;
  name: string;
  musicians?: string[] | Musician[];

  constructor(obj?: any) {
    super(obj);
    this.deserialize(obj);
  }

  deserialize(input: any): Instrument {
    if (typeof input === 'object') {
      if (input.id) { this.id = input.id; }
      this.name = input.name || null;
      if (input.musicians) { this.musicians = input.musicians; }
    }

    return this;
  }

  toString(): string {
    return this.name.toString();
  }
}
