import {Component} from '@angular/core';
import {RegisterFormComponent} from "./register-form/register-form.component";
import {Router} from "@angular/router";
import {State} from "../../app.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private router: Router
  ) {}

  switchRoute(screen: State) {
    this.router.navigate([screen.valueOf()]).then()
  }

  registerClicked() {
    this.switchRoute(State.HOME)
  }

  backClicked() {
    this.switchRoute(State.WELCOME)
  }

}
