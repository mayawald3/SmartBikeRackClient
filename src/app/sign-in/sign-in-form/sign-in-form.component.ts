import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in-form.component.html',
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
