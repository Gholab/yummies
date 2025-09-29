import { ChangeDetectorRef, Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsComponent, TabItem } from './ui/atoms/tabs/tabs.component';
import { ButtonComponent } from './ui/atoms/button/button.component';
import { TitleComponent } from './ui/atoms/title/title.component';
import { NumberSelectorComponent } from './ui/atoms/number-selector/number-selector.component';
import {CardItemComponent} from './ui/molecules/cardItem/cardItem.component';
import {DigitButtonComponent} from "./ui/atoms/digit-button/digit-button.component";
import { NumpadComponent } from './ui/molecules/numpad/numpad.component';
import {ModalService} from './services/modal.service';
import {EditItemModalComponent} from './ui/molecules/edit-item-modal/edit-item-modal.component';
import {ModalComponent} from './ui/molecules/modal/modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TitleComponent, ButtonComponent, NumberSelectorComponent, CardItemComponent, DigitButtonComponent, NumpadComponent, TabsComponent, ModalComponent, EditItemModalComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private modalService: ModalService) {}

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

  modalEnabler(){
    this.modalService.open(EditItemModalComponent, {
      menuItem: {
        _id: "1",
        shortName: "test",
        price: 20,
        category: "STARTER",
        image: "https://cdn.pixabay.com/photo/2022/04/11/08/52/iced-tea-7125271_960_720.jpg",
        description: "un bon test",
        ingredients: [{
          name: "fomaj",
          range: "0-1-2"
        }],
        allergenes: ["oeuf"]
      }})
  }
}
