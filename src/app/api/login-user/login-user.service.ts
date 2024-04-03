import { Injectable } from '@angular/core'
import {LoginUserStore} from './login-user.store'
import {User} from '../user/user'


@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor(private loginUserStore: LoginUserStore) {
  }

  login(user: User) {
    this.loginUserStore.set([user])
  }

  logout() {
    this.loginUserStore.remove()
  }
}
