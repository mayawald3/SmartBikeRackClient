import {Rack} from './rack'
import {EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {Injectable} from '@angular/core'

export interface RackState extends EntityState<Rack> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'rack', idKey: 'id'})
export class RackStore extends EntityStore<RackState> {
  constructor() {
    super()
  }

}

@Injectable({providedIn: 'root'})
export class RackQuery extends QueryEntity<RackState> {
  constructor(store: RackStore) {
    super(store)
  }
}
