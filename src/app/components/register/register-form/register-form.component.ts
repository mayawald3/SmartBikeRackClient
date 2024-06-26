import {Component, EventEmitter, Output} from '@angular/core'
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {AsyncPipe, NgForOf, NgIf} from '@angular/common'
import {UserService} from '../../../api/user/user.service'
import {User} from '../../../api/user/user'
import {UserQuery, UserStore} from '../../../api/user/user.store'
import {BehaviorSubject, map} from 'rxjs'
import {ApartmentQuery} from '../../../api/apartment/apartment.store'
import {ProcessService} from '../../../api/process/process.service'
import {RackService} from '../../../api/rack/rack.service'

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  @Output() register = new EventEmitter()

  validatePasswordMatch = (control: AbstractControl): { [key: string]: any } | null => {
    const password = this.registerForm?.get('password')?.value as string;
    const passwordConfirm = control.value as string;
    if (password !== passwordConfirm) {
      return {passwordMatch: true};
    }
    return null;
  };

  apartments$ = this.apartmentQuery.selectAll()
  allUsers$ = this.userQuery.selectAll()

  registerForm = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    apartment_id: new FormControl<number>(0, Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required, this.validatePasswordMatch]),
  });

  userExistsError$ = new BehaviorSubject(false)

  constructor(
    private apartmentQuery: ApartmentQuery,
    private userService: UserService,
    private userQuery: UserQuery,
    private processService: ProcessService,
    private rackService: RackService
  ) {
  }

  registerClicked() {
    this.userExistsError$.next(false)
    let newUser: User = {
      id: 0,
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      apartment_id: this.registerForm.value.apartment_id
    }
    this.allUsers$.pipe(map((users) => {
      if (users.find((user) => user.username === this.registerForm.value.username) === undefined) {
        this.processService.getAllProcesses().subscribe()
        this.rackService.getAllRacks().subscribe()
        this.userService.createUser(newUser).subscribe()
        this.register.emit()
      } else {
        this.userExistsError$.next(true)
      }
    })).subscribe()

  }
}
