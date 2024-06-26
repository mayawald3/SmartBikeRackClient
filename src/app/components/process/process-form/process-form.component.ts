import {Component, Input, OnInit} from '@angular/core'
import {BehaviorSubject, map} from 'rxjs'
import {User} from '../../../api/user/user'
import {Router} from '@angular/router'
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {AsyncPipe, NgForOf, NgIf} from '@angular/common'
import {Process} from '../../../api/process/process'
import {ProcessService} from '../../../api/process/process.service'
import {RackService} from '../../../api/rack/rack.service'
import {RackQuery} from '../../../api/rack/rack.store'

@Component({
  selector: 'app-process-form',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './process-form.component.html',
  styleUrl: './process-form.component.css'
})
export class ProcessFormComponent implements OnInit {
  @Input() loggedInUser: User
  @Input() set mostRecentProcess(process: Process) {
    this.mostRecentProcess$.next(process)
  }
  mostRecentProcess$ = new BehaviorSubject<Process>(null)
  passwordIncorrect$ = new BehaviorSubject(false)
  openRacks$ = this.rackQuery.selectAll().pipe(map((racks) =>
    racks.filter((rack) => this.loggedInUser.apartment_id === rack.apartment_id && rack.is_open)))

  processForm = new FormGroup({
    rack_id: new FormControl<number>(null, Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
      private router: Router,
      private processService: ProcessService,
      private rackService: RackService,
      private rackQuery: RackQuery
  ) {
  }

  ngOnInit(): void {
    if (!this.mostRecentProcess$.value.is_completed) {
      this.processForm.get('rack_id').setValidators(null)
    } else {
      this.processForm.get('rack_id').setValidators(Validators.required)
    }
  }

  processInitiated() {
    this.passwordIncorrect$.next(false)
    if (this.processForm.value.password === this.loggedInUser.password) {
      if (this.mostRecentProcess$.value.is_completed) {
        // LOCKING BIKE
        let newProcess = {
          id: 0,
          user_id: this.loggedInUser.id,
          rack_id: this.processForm.value.rack_id,
          is_completed: false,
          time_start: new Date().getTime(),
          time_end: new Date().getTime()
        }
        this.processService.createProcess(newProcess).subscribe()
        this.rackService.updateRack(this.processForm.value.rack_id, false).subscribe()
      } else {
        // UNLOCKING BIKE
        let updatedProcess = {
          id: this.mostRecentProcess$.value.id,
          user_id: this.mostRecentProcess$.value.user_id,
          rack_id: this.mostRecentProcess$.value.rack_id,
          is_completed: true,
          time_start: this.mostRecentProcess$.value.time_start,
          time_end: new Date().getTime()
        }
        this.processService.updateProcess(updatedProcess).subscribe()
        this.rackService.updateRack(this.mostRecentProcess$.value.rack_id, true).subscribe()
      }
      this.router.navigate(['home']).then()
    } else {
      this.passwordIncorrect$.next(true)
    }
  }
}
