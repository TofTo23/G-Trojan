import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in-button',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './log-in-button.html'
})
export class LogInButton {

}
