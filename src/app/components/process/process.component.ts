import { Component } from '@angular/core'
import {AsyncPipe, NgIf} from '@angular/common'
import {BehaviorSubject} from 'rxjs'
import {Router} from '@angular/router'
import {LockStatusService} from '../../api/lock-status/lock-status.service'
import {Lock} from '../../api/lock-status/lock-status.enum'

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent {
  LOCKED = Lock.LOCKED
  UNLOCKED = Lock.UNLOCKED
  lockStatus$  = new BehaviorSubject(this.lockStatusService.getLockStatus())

  constructor(
    private router: Router,
    private lockStatusService: LockStatusService
  ) {}

  processInitiated() {
    this.lockStatusService.updateLockStatus(this.lockStatus$.value === Lock.UNLOCKED? Lock.LOCKED : Lock.UNLOCKED)
    this.router.navigate(['home']).then()
  }
}
