import {Component, OnInit} from '@angular/core'
import {AsyncPipe, NgIf} from '@angular/common'
import {Router} from '@angular/router'
import {FormsModule} from '@angular/forms'
import {State} from '../../app.component'
import {RegisterFormComponent} from '../register/register-form/register-form.component'
import {ProcessFormComponent} from './process-form/process-form.component'
import {ProcessQuery} from '../../api/process/process.store'
import {LoginUserQuery} from '../../api/login-user/login-user.store'
import {combineLatest, map} from 'rxjs'
import { UserQuery } from '../../api/user/user.store'
import {RackQuery} from '../../api/rack/rack.store'
import {ApartmentQuery} from '../../api/apartment/apartment.store'

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    FormsModule,
    RegisterFormComponent,
    ProcessFormComponent
  ],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent implements OnInit {
  isLoading$ = combineLatest(
    [this.userQuery.selectLoading(), this.loginUserQuery.selectLoading(),
      this.rackQuery.selectLoading(), this.apartmentQuery.selectLoading(),
      this.processQuery.selectLoading()]).pipe(map((loaders) =>
    loaders.find((loader) => loader)
  ))
  loggedInUser$ = this.loginUserQuery.selectFirst()
  process$ = combineLatest([this.loggedInUser$, this.processQuery.selectAll()])
    .pipe(map(([loggedInUser, processes]) => {
        let mostRecentForUser = processes.filter((process) => process.user_id === loggedInUser?.id)
          .sort((a, b) =>
            new Date(b.time_start).getTime() - new Date(a.time_start).getTime())[0]
        if (!mostRecentForUser) {
          mostRecentForUser = {
            id: 0,
            user_id: loggedInUser?.id,
            rack_id: 0,
            is_completed: true,
            time_start: 0,
            time_end: 0
          }
        }
        return mostRecentForUser
      }
    ))

  constructor(
    private router: Router,
    private processQuery: ProcessQuery,
    private loginUserQuery: LoginUserQuery,
    private userQuery: UserQuery,
    private rackQuery: RackQuery,
    private apartmentQuery: ApartmentQuery
  ) {
  }

  ngOnInit() {
    if (!this.loggedInUser$) {
      this.switchRoute(State.WELCOME)
    }
  }

  switchRoute(screen: State) {
    this.router.navigate([screen.valueOf()]).then()
  }
}
