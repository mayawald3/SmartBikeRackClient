import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common'
import {Router} from '@angular/router'
import {State} from '../../app.component'
import {LockStatusService} from '../../api/lock-status/lock-status.service'
import {Lock} from '../../api/lock-status/lock-status.enum'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Output() lockChanged = new EventEmitter()
  LOCKED = Lock.LOCKED
  UNLOCKED = Lock.UNLOCKED
  lockStatus$  = new BehaviorSubject(this.lockStatusService.getLockStatus())

  constructor(
    private router: Router,
    private lockStatusService: LockStatusService
  ) {}

  ngOnInit() {
    this.lockStatus$.next(this.lockStatusService.getLockStatus())
  }

  switchRoute(screen: State) {
    this.router.navigate([screen.valueOf()]).then()
  }
  onLockClicked() {
    this.switchRoute(State.PROCESS)
  }

}
