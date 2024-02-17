import {Component, EventEmitter, Output} from '@angular/core';
import {RegisterFormComponent} from "../register/register-form/register-form.component";
import {SignInFormComponent} from "./sign-in-form/sign-in-form.component";

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
  @Output() signIn = new EventEmitter()

  signInClicked() {
    this.signIn.emit()
  }
}
