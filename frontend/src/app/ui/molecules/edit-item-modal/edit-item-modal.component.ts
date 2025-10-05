import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {MenuItem} from '../../../models/menu-item.model';
import {ButtonComponent} from '../../atoms/button/button.component';
import {TabItem, TabsComponent} from '../../atoms/tabs/tabs.component';
import {NumberSelectorComponent} from '../../atoms/number-selector/number-selector.component';
import {ModalService} from '../../../services/modal.service';
import {TitleComponent} from '../../atoms/title/title.component';

@Component({
  selector: 'app-edit-item-modal',
  imports: [ButtonComponent, TabsComponent, NumberSelectorComponent, TitleComponent],
  templateUrl: './edit-item-modal.component.html',
  styleUrl: './edit-item-modal.component.scss'
})
export class EditItemModalComponent {
  @Input() menuItem! : MenuItem;
  @ViewChild("ingredients", { static: true }) ingredientsTab!: TemplateRef<unknown>;
  @ViewChild("allergenes", { static: true }) allergeneTab!: TemplateRef<unknown>;
  tabItems: TabItem[] = [];
  ingredientStatus:any = {};

  constructor(private modalService: ModalService) {
  }

  ngOnInit(){
    this.tabItems = [
      { title: 'Ingredients',     template: this.ingredientsTab },
      { title: 'Allergenes',    template: this.allergeneTab }
    ];

    for(let ingredientObj of this.menuItem.ingredients){
      let splittedRange = ingredientObj.range.split("-");
      this.ingredientStatus[ingredientObj.name] = {
        min: parseInt(splittedRange[0]),
        current: parseInt(splittedRange[1]),
        max: parseInt(splittedRange[2]),
        default: parseInt(splittedRange[1])
      }
    }
  }

  onAddToCart(){
    let modifications: any = {};
    for(let ingredient of Object.keys(this.ingredientStatus)){
      let curr = this.ingredientStatus[ingredient].current;
      let def = this.ingredientStatus[ingredient].default;
      if( curr !== def ){
        modifications[ingredient] =  curr-def;
      }
    }
    let itemForCart: any= { //TODO: change any type to adapted Schema if there is
      shortName: this.menuItem.shortName
      //TODO: complete the item with whats needed
    }
    //s'il y a des modifs, on les ajoutes à l'item
    if(Object.keys(modifications).length !== 0){
      itemForCart["modifications"] = modifications;
    }
    //this.orderService.addItemToCart(itemForCart);
    this.modalService.close(true);
  }

  protected readonly Object = Object;
}
