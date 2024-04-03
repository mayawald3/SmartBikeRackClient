import {User} from './user'
import {EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {Injectable} from '@angular/core'

export interface UserState extends EntityState<User> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'user', idKey: 'id'})
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super()
  }
}

@Injectable({providedIn: 'root'})
export class UserQuery extends QueryEntity<UserState> {

  constructor(protected override store: UserStore) {
    super(store)
  }

}
