import {Component, OnInit} from '@angular/core'
import {AsyncPipe, NgIf} from '@angular/common'
import {BehaviorSubject, Observable} from 'rxjs'
import {Router} from '@angular/router'
import {LockStatusService} from '../../api/lock-status/lock-status.service'
import {Lock} from '../../api/lock-status/lock-status.enum'
import {UserService} from "../../api/user/user.service";
import {FormsModule} from "@angular/forms";
import {UserStore} from '../../api/user/user.store'
import {State} from '../../app.component'

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    FormsModule
  ],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent implements OnInit {
  LOCKED = Lock.LOCKED
  UNLOCKED = Lock.UNLOCKED
  lockStatus$ = new BehaviorSubject(this.lockStatusService.getLockStatus())
  loggedInUser = this.userStore.getLoggedInUser()
  rackId$: Observable<number>
  passwordIncorrect$ = new BehaviorSubject(false)
  passwordInput: string

  constructor(
    private router: Router,
    private lockStatusService: LockStatusService,
    private userService: UserService,
    private userStore: UserStore
  ) {
  }

  ngOnInit() {
    if (this.loggedInUser === null) {
      this.switchRoute(State.WELCOME)
    } else {
      this.rackId$ = this.userService.getRackId(this.loggedInUser.username)
    }
  }

  switchRoute(screen: State) {
    this.router.navigate([screen.valueOf()]).then()
  }

  processInitiated() {
    if (this.passwordInput === this.loggedInUser!.password) {
      this.lockStatusService.updateLockStatus(this.lockStatus$.value === Lock.UNLOCKED ? Lock.LOCKED : Lock.UNLOCKED)
      this.router.navigate(['home']).then()
    } else {
      this.passwordIncorrect$.next(true)
    }
  }
}
