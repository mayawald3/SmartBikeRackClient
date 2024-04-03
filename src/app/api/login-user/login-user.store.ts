import {User} from '../user/user'
import {EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {Injectable} from '@angular/core'

export interface LoginUserState extends EntityState<User> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'loginUser', idKey: 'id'})
export class LoginUserStore extends EntityStore<LoginUserState> {
  constructor() {
    super()
  }

}

@Injectable({providedIn: 'root'})
export class LoginUserQuery extends QueryEntity<LoginUserState> {

  constructor(protected override store: LoginUserStore) {
    super(store)
  }
}
