import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected title = 'frotnend';
}
