import {Component, EventEmitter, Output} from '@angular/core'
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {AsyncPipe, NgIf} from '@angular/common'
import {User} from '../../../api/user/user'
import {BehaviorSubject, map} from 'rxjs'
import {UserQuery, UserStore} from '../../../api/user/user.store'

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf
  ],
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  @Output() signIn: EventEmitter<User> = new EventEmitter()
  @Output() register: EventEmitter<string> = new EventEmitter()
  signInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  allUsers$ = this.userQuery.selectAll()
  passwordIncorrect$ = new BehaviorSubject(false)
  usernameIncorrect$ = new BehaviorSubject(false)

  constructor(private userQuery: UserQuery,
              private userStore: UserStore) {
  }

  signInClicked() {
    this.passwordIncorrect$.next(false)
    this.usernameIncorrect$.next(false)
    this.allUsers$.pipe(map((users) => {
      let loginUser = users.filter((user) => user.username === this.signInForm.value.username)[0]
      if (loginUser) {
        if (loginUser.password === this.signInForm.value.password) {
          this.userStore.setLoggedInUser(loginUser)
          this.signIn.emit(loginUser)
        } else {
          this.passwordIncorrect$.next(true)
        }
      } else {
        this.usernameIncorrect$.next(true)
      }
    })).subscribe()
  }
}
