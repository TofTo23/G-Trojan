import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blog-button',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './blog-button.html'
})
export class BlogButton {

}
