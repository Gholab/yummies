import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './ui/atoms/title/title.component';
import { ButtonComponent } from './ui/atoms/button/button.component';
import { NumberSelectorComponent } from './ui/atoms/number-selector/number-selector.component';
import {CardItemComponent} from './ui/molecules/cardItem/cardItem.component';
import {DigitButtonComponent} from "./ui/atoms/digit-button/digit-button.component";
import { BipperComponent } from './ui/molecules/bipper/bipper.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitleComponent, ButtonComponent, NumberSelectorComponent, CardItemComponent, DigitButtonComponent, BipperComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
  