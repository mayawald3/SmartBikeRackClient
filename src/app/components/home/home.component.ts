import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {combineLatest, map, Observable} from 'rxjs'
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common'
import {Router} from '@angular/router'
import {State} from '../../app.component'
import {ProcessQuery} from '../../api/process/process.store'
import {ApartmentQuery} from '../../api/apartment/apartment.store'
import {ProcessService} from '../../api/process/process.service'
import {RackService} from '../../api/rack/rack.service'
import {RackQuery} from '../../api/rack/rack.store'
import {LoginUserQuery} from '../../api/login-user/login-user.store'
import {User} from '../../api/user/user'
import {UserQuery} from '../../api/user/user.store'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Output() lockChanged = new EventEmitter()
  isLoading$ = combineLatest(
    [this.userQuery.selectLoading(), this.loginUserQuery.selectLoading(),
    this.rackQuery.selectLoading(), this.apartmentQuery.selectLoading(),
    this.processQuery.selectLoading()]).pipe(map((loaders) =>
      loaders.find((loader) => loader)
  ))
  loggedInUser$: Observable<User> = this.loginUserQuery.selectFirst()
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

  apartmentName$ = combineLatest([this.loggedInUser$, this.apartmentQuery.selectAll()])
    .pipe(map(([loggedInUser, apartments]) =>
      apartments.find((apartment) =>
        apartment.id === loggedInUser?.apartment_id)?.apartmentName))

  numberRacksOpen$ = combineLatest([this.loggedInUser$, this.rackQuery.selectAll()])
    .pipe(map(([loggedInUser, racks]) =>
      racks.filter((rack) => loggedInUser?.apartment_id === rack?.apartment_id && rack?.is_open).length))

  constructor(
    private router: Router,
    private processQuery: ProcessQuery,
    private apartmentQuery: ApartmentQuery,
    private processService: ProcessService,
    private rackService: RackService,
    private rackQuery: RackQuery,
    private loginUserQuery: LoginUserQuery,
    private userQuery: UserQuery
  ) {
  }

  ngOnInit() {
    this.processService.getAllProcesses().subscribe()
    this.rackService.getAllRacks().subscribe()
  }

  switchRoute(screen: State) {
    this.router.navigate([screen.valueOf()]).then()
  }

  onLockClicked() {
    this.switchRoute(State.PROCESS)
  }

}
