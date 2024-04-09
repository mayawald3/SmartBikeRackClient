import {Component, OnInit} from '@angular/core'
import {AsyncPipe, NgIf} from '@angular/common'
import {Router} from '@angular/router'
import {FormsModule} from '@angular/forms'
import {State} from '../../app.component'
import {RegisterFormComponent} from '../register/register-form/register-form.component'
import {ProcessFormComponent} from './process-form/process-form.component'
import {ProcessQuery} from '../../api/process/process.store'
import {LoginUserQuery} from '../../api/login-user/login-user.store'
import {map} from 'rxjs'

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
  loggedInUser$ = this.loginUserQuery.selectFirst()
  process$ = this.loginUserQuery.selectFirst()
    .pipe(map((loggedInUser) => this.processQuery.getProcessForUser(loggedInUser?.id)))

  constructor(
    private router: Router,
    private processQuery: ProcessQuery,
    private loginUserQuery: LoginUserQuery
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
