import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TestMenu} from './components/test-menu/test-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestMenu],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
