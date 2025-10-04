import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogInButton } from '../log-in-button/log-in-button';
import { Language } from '../language/language';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LogInButton, Language],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
