import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {HomeComponent} from "./home/home.component";
import {ProcessComponent} from "./process/process.component";
import {RegisterComponent} from "./register/register.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {WelcomeComponent} from "./welcome/welcome.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, HomeComponent, ProcessComponent,
    RegisterComponent, SignInComponent, WelcomeComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  WELCOME = State.WELCOME
  REGISTER = State.REGISTER
  HOME = State.HOME
  SIGN_IN = State.SIGN_IN
  PROCESS = State. PROCESS

  title = 'SmartBikeRackClient'
  state$ = new BehaviorSubject(State.WELCOME)

  switchPages(state: State) {
    this.state$.next(state)
  }
}

export enum State {
  WELCOME,
  SIGN_IN,
  REGISTER,
  HOME,
  PROCESS
}
