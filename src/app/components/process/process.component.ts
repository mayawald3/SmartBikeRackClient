import {Component, OnInit} from '@angular/core'
import {AsyncPipe, NgIf} from '@angular/common'
import {Router} from '@angular/router'
import {FormsModule} from '@angular/forms'
import {State} from '../../app.component'
import {RegisterFormComponent} from '../register/register-form/register-form.component'
import {ProcessFormComponent} from './process-form/process-form.component'
import {ProcessQuery} from '../../api/process/process.store'
import {ApartmentQuery} from '../../api/apartment/apartment.store'
import {RackService} from '../../api/rack/rack.service'
import {ProcessService} from '../../api/process/process.service'
import {LoginUserQuery} from '../../api/login-user/login-user.store'
import {combineLatest, map} from 'rxjs'

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
  process$ = this.loginUserQuery.selectFirst().pipe(map((loggedInUser) => this.processQuery.getProcessForUser(loggedInUser.id)))
  apartmentName$ = combineLatest([this.loggedInUser$, this.apartmentQuery.selectAll()])
    .pipe(map(([loggedInUser, apartments]) => {
      return apartments.find((apartment) =>
        apartment.id === loggedInUser.apartment_id)?.apartmentName
    }))

  constructor(
    private router: Router,
    private processQuery: ProcessQuery,
    private apartmentQuery: ApartmentQuery,
    private processService: ProcessService,
    private rackService: RackService,
    private loginUserQuery: LoginUserQuery
  ) {
  }

  ngOnInit() {
    this.processService.getAllProcesses().subscribe()
    this.rackService.getAllRacks().subscribe()
    if (!this.loggedInUser$) {
      this.switchRoute(State.WELCOME)
    }
  }

  switchRoute(screen: State) {
    this.router.navigate([screen.valueOf()]).then()
  }
}
