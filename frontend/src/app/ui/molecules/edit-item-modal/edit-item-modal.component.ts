import {Component, Input} from '@angular/core';
import {MenuItem} from '../../../models/menu-item.model';

@Component({
  selector: 'app-edit-item-modal',
  imports: [],
  templateUrl: './edit-item-modal.component.html',
  styleUrl: './edit-item-modal.component.scss'
})
export class EditItemModalComponent {
  @Input() menuItem! : MenuItem;
}
