import {Lock} from './lock-status.enum'
import {EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {Injectable} from '@angular/core'

export interface LockStatusState extends EntityState<Lock> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'lock-status'})
export class LockStatusStore extends EntityStore<LockStatusState> {
  constructor() {
    super()
  }

}

@Injectable({providedIn: 'root'})
export class LockStatusQuery extends QueryEntity<LockStatusState> {
  constructor(store: LockStatusStore) {
    super(store)
  }
}
