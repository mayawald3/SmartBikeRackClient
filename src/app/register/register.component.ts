import {Component, EventEmitter, Output} from '@angular/core';
import {RegisterFormComponent} from "./register-form/register-form.component";

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
  @Output() register = new EventEmitter()

  registerClicked() {
    this.register.emit()
  }

}
