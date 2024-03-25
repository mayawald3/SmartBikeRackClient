import {Component} from '@angular/core'
import {RegisterFormComponent} from '../register/register-form/register-form.component'
import {SignInFormComponent} from './sign-in-form/sign-in-form.component'
import {Router} from '@angular/router'
import {State} from '../../app.component'
import {User} from '../../api/user/user'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RegisterFormComponent,
    SignInFormComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(
    private router: Router
  ) {}

  switchRoute(screen: State) {
    this.router.navigate([screen.valueOf()]).then()
  }

  signInClicked(user: User) {
    this.switchRoute(State.HOME)
  }

  goToRegister(username: string) {
    this.switchRoute(State.REGISTER)
  }
}
