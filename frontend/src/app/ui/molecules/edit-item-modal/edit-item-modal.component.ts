import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {MenuItem} from '../../../models/menu-item.model';
import {ButtonComponent} from '../../atoms/button/button.component';
import {TabItem, TabsComponent} from '../../atoms/tabs/tabs.component';

@Component({
  selector: 'app-edit-item-modal',
  imports: [ButtonComponent, TabsComponent],
  templateUrl: './edit-item-modal.component.html',
  styleUrl: './edit-item-modal.component.scss'
})
export class EditItemModalComponent {
  @Input() menuItem! : MenuItem;
  @ViewChild("ingredients", { static: true }) ingredientsTab!: TemplateRef<unknown>;
  @ViewChild("allergenes", { static: true }) allergeneTab!: TemplateRef<unknown>;
  tabItems: TabItem[] = [];

  ngOnInit(){
    this.tabItems = [
      { title: 'Ingredients',     template: this.ingredientsTab },
      { title: 'Allergenes',    template: this.allergeneTab }
    ];
  }
}
