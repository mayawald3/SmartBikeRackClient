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

  getProcessForUser(userId: number): Observable<Process> {
    return this.selectAll().pipe(map((processes) => {
      let mostRecentForUser = processes.filter((process) => process.user_id === userId)
        .sort((a, b) =>
          new Date(b.time_start).getTime() - new Date(a.time_start).getTime())[0]
      if (!mostRecentForUser) {
        mostRecentForUser = {
          id: 0,
          user_id: userId,
          rack_id: 0,
          is_completed: true,
          time_start: 0,
          time_end: 0
        }
      }
      return mostRecentForUser
    }))
  }
}
