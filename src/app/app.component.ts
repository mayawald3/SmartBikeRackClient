import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet, RouterState} from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterOutlet],
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

  constructor (
    private router: Router,
    private titleService: Title) {
    this.handleRouteEvents()
  }

  handleRouting(screen: State) {
    this.router.navigate([screen.valueOf()]).then()
  }

  onSignOut() {
    this.handleRouting(State.WELCOME)
  }

  handleRouteEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.titleService.setTitle(title);
        let currentPage = event.url
        this.state$.next(event.url.replace('/','') as State)
        console.log(currentPage)
      }
    });
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }
}

export enum State {
  WELCOME = 'welcome',
  SIGN_IN = 'signIn',
  REGISTER = 'register',
  HOME = 'home',
  PROCESS = 'process'
}
