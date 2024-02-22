import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {ProcessComponent} from "./components/process/process.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, title: 'Bike Nest Home'},
  { path: 'welcome', component: WelcomeComponent, title: 'Bike Nest'},
  { path: 'process', component: ProcessComponent, title: 'Bike Nest Process'},
  { path: 'signIn', component: SignInComponent, title: 'Sign In Bike Nest'},
  { path: 'register', component: RegisterComponent, title: 'Register Bike Nest'}];
