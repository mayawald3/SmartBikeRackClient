import {Component, EventEmitter, Output} from '@angular/core'
import {Router} from '@angular/router'
import {State} from '../../app.component'
import {AsyncPipe, NgIf} from '@angular/common'
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  @Output() goToSignIn = new EventEmitter()
  @Output() goToRegister = new EventEmitter()
  descriptionText = "The best solution for safely storing your beloved bicycle with just the " +
    "touch of a button. Equipped with advanced locking mechanisms, BikeNest ensures that your bike stays safe " +
    "and sound wherever you go. Say goodbye to fumbling with keys or locks and hello to peace of mind knowing " +
    "that BikeNest will protect your bike for you. With BikeNest's secure webpage, you can see the status " +
    "of your bike's lock at anytime. Register your bike today!"
  learnMore$ = new BehaviorSubject(false)

  constructor(
    private router: Router
  ) {}

  switchRoute(screen: State) {
    this.router.navigate([screen.valueOf()]).then()
  }
  signInClicked() {
    this.switchRoute(State.SIGN_IN)
  }

  registerClicked() {
    this.switchRoute(State.REGISTER)
  }

  learnMoreClicked() {
    this.learnMore$.next(!this.learnMore$.value)
  }

}
