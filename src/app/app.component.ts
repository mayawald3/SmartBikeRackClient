import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {HomeComponent} from "./home/home.component";
import {ProcessComponent} from "./process/process.component";
import {RegisterComponent} from "./register/register.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {WelcomeComponent} from "./welcome/welcome.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, HomeComponent, ProcessComponent,
    RegisterComponent, SignInComponent, WelcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SmartBikeRackClient'
  lockStatus$  = new BehaviorSubject('Locked')


  onLockClicked() {
    if (this.lockStatus$.value === 'Locked') {
    this.lockStatus$.next('Unlocked')
    } else {
      this.lockStatus$.next('Locked')
    }
  }
}
