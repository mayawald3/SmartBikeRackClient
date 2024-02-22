import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  @Output() signIn = new EventEmitter()
  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  signInClicked() {
    this.signIn.emit()
  }
}
