import {Component, EventEmitter, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AsyncPipe} from "@angular/common";

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
  lockStatus$  = new BehaviorSubject('Locked')
  onLockClicked() {
    if (this.lockStatus$.value === 'Locked') {
      this.lockStatus$.next('Unlocked')
    } else {
      this.lockStatus$.next('Locked')
    }
    this.lockChanged.emit()
  }

}
