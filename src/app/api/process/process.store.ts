import {EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {Injectable} from '@angular/core'
import {Process} from './process'
import {map, Observable} from 'rxjs'

export interface ProcessState extends EntityState<Process> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'process'})
export class ProcessStore extends EntityStore<ProcessState> {
  constructor() {
    super()
  }

}

@Injectable({providedIn: 'root'})
export class ProcessQuery extends QueryEntity<ProcessState> {
  constructor(store: ProcessStore) {
    super(store)
  }
}
