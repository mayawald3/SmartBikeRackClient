import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  descriptionText = "BikeNest - Your solution for safely storing your beloved bicycle with just the " +
    "touch of a button. Equipped with advanced locking mechanisms, BikeNest ensures that your bike stays safe " +
    "and sound wherever you go. Say goodbye to fumbling with keys or locks and hello to peace of mind knowing " +
    "that BikeNest will protect your bike for you. With BikeNest's secure webpage, you can see the status " +
    "of your bike's lock at anytime. Register your bike today!"
}
