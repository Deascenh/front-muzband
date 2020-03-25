import {User} from './User.model';

export class Music {
  id?: string;
  title: string;
  creator: string | User;
  createdAt?: string;
  updatedAt?: string;
}
