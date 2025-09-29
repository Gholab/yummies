import { ChangeDetectorRef, Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsComponent, TabItem } from './ui/atoms/tabs/tabs.component';
import { ButtonComponent } from './ui/atoms/button/button.component';
import { TitleComponent } from './ui/atoms/title/title.component';
import { NumberSelectorComponent } from './ui/atoms/number-selector/number-selector.component';
import {CardItemComponent} from './ui/molecules/cardItem/cardItem.component';
import {DigitButtonComponent} from "./ui/atoms/digit-button/digit-button.component";
import { NumpadComponent } from './ui/molecules/numpad/numpad.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitleComponent, ButtonComponent, NumberSelectorComponent, CardItemComponent, DigitButtonComponent, NumpadComponent, TabsComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('tplA', { static: true }) tplA!: TemplateRef<unknown>;
  @ViewChild('tplB', { static: true }) tplB!: TemplateRef<unknown>;
  @ViewChild('tplC', { static: true }) tplC!: TemplateRef<unknown>;

  tabItems: TabItem[] = [];

  ngOnInit(): void {
    this.tabItems = [
      { title: 'Aperçu',     template: this.tplA },
      { title: 'Détails',    template: this.tplB },
      { title: 'Paramètres', template: this.tplC, disabled: false },
    ];
    
  }
}
  