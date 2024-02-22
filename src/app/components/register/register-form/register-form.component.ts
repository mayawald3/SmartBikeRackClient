import {Component, EventEmitter, Output} from '@angular/core'
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {AsyncPipe, NgForOf} from "@angular/common"

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  @Output() register = new EventEmitter()

  // TODO: once apartments endpoint is created switch this to observable
  apartments$ = ["Woodbridge", "Citadel", "Cottonwood"]
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    apartment: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  registerClicked() {
    this.register.emit()
  }
}
