import { Injectable } from '@angular/core'
import {HttpClient, HttpResponse} from '@angular/common/http'
import {map, Observable, tap} from 'rxjs'
import {User} from './user'
import {UserStore} from './user.store'
import {LoginUserService} from '../login-user/login-user.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/user'

  constructor(private http: HttpClient,
              private userStore: UserStore,
              private loginUserService: LoginUserService) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`,
      {withCredentials: false, observe: 'response'})
      .pipe(
        map((response: HttpResponse<User[]>) => response.body),
        tap((users) => {
          this.userStore.set(users)
        })
    )
  }

  createUser(newUser: User) {
    return this.http.post<User>(
      `${this.baseUrl}`,
      newUser,
      {withCredentials: false, observe: 'response'})
      .pipe(
      map((response: HttpResponse<User>) => response.body),
      tap((user) => {
        this.userStore.upsert(user.id, user)
        this.loginUserService.login(user)
      })
    )
  }
}
