import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogInButton } from '../log-in-button/log-in-button';
import { BlogButton } from '../blog-button/blog-button';
import { Language } from '../language/language';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LogInButton, BlogButton, Language],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}