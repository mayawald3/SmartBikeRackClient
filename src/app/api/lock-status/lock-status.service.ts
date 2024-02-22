import {Lock} from './lock-status.enum'
import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LockStatusService {
  private lockStatus = Lock.UNLOCKED

  constructor() {
  }
  getLockStatus(): Lock {
    return this.lockStatus
  }

  updateLockStatus(newStatus: Lock) {
    this.lockStatus = newStatus
  }
}
