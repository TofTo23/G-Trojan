import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class Navbar {
  // @ViewChild('navbar') navbar!: ElementRef<HTMLDivElement>;
  // ngOnInit(): void {
  //   let lastScrollTop = 0;
  //   window.addEventListener('scroll', () => {
  //     const scrollTop = window.scrollY;
  //     if (scrollTop > lastScrollTop) {
  //       // scroll w dół → ukryj navbar
  //       this.navbar!.nativeElement.style.transform = 'translateY(-100%)';
  //     } else {
  //       // scroll w górę → pokaż navbar
  //       this.navbar!.nativeElement.style.transform = 'translateY(0)';
  //     }
  //     lastScrollTop = scrollTop;
  //   });
  // }
}
