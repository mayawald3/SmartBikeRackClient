import {Apartment} from './apartment'
import {EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {Injectable} from '@angular/core'

export interface ApartmentState extends EntityState<Apartment> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'user', idKey: 'id'})
export class ApartmentStore extends EntityStore<ApartmentState> {
  constructor() {
    super()
  }

}

@Injectable({providedIn: 'root'})
export class ApartmentQuery extends QueryEntity<ApartmentState> {
  constructor(store: ApartmentStore) {
    super(store)
  }
}
