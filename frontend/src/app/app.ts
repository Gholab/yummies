import { ChangeDetectorRef, Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { TabsComponent, TabItem } from './ui/atoms/tabs/tabs.component';
import { ButtonComponent } from './ui/atoms/button/button.component';
import { TitleComponent } from './ui/atoms/title/title.component';
import { NumberSelectorComponent } from './ui/atoms/number-selector/number-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TabsComponent, ButtonComponent, TitleComponent, NumberSelectorComponent],
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
    // pas besoin de detectChanges ici
  }
}
