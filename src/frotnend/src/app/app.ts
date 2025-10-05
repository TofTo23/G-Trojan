import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Lektor } from './lektor/lektor';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, RouterOutlet, RouterModule, Lektor],
  templateUrl: './app.html',
})
export class App {
  protected title = 'frotnend';
  textToRead: string = "Wśród nocnej ciszy głos się rozchodzi, wstańcie lehiści. Arkaaaaaa nadchodzi.";
}
