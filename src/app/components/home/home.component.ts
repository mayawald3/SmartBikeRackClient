import {Component, EventEmitter, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";
import {State} from "../../app.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Output() lockChanged = new EventEmitter()
  LOCKED = Lock.LOCKED
  UNLOCKED = Lock.UNLOCKED
  lockStatus$  = new BehaviorSubject(Lock.UNLOCKED)

  constructor(
    private router: Router
  ) {}

  switchRoute(screen: State) {
    this.router.navigate([screen.valueOf()]).then()
  }
  onLockClicked() {
    if (this.lockStatus$.value === Lock.LOCKED) {
      this.lockStatus$.next(Lock.UNLOCKED)
    } else {
      this.lockStatus$.next(Lock.LOCKED)
    }
    this.switchRoute(State.PROCESS)
  }

}

export enum Lock {
  LOCKED= 'LOCKED',
  UNLOCKED = 'UNLOCKED'
}
