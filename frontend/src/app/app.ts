import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [MatButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
