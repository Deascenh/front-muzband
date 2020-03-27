import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../data/user.service';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../App/App.state';
import {EUserActions, GetUser, GetUsers, GetUsersSuccess, GetUserSuccess} from './user.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {User} from '../../models';
import {selectUserList} from './user.selectors';

@Injectable()
export class UserEffects {

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectUserList))),
    switchMap(([id, users]) => {
      const selectedUser = users.find(user => user.id === id);
      return of(new GetUserSuccess(selectedUser));
    })
  );

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType<GetUsers>(EUserActions.GetUsers),
    switchMap(() => this.userService.getAll()),
    map(data => data['hydra:member']),
    switchMap((users: User[]) => of(new GetUsersSuccess(users)))
  );

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}
}
