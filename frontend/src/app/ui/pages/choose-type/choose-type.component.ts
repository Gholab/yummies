import { Component } from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {Router} from '@angular/router';
import {GroupCodeModalComponent} from '../../molecules/group-code-modal/group-code-modal.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {TitleComponent} from '../../atoms/title/title.component';

@Component({
  selector: 'app-choose-type',
  imports: [ButtonComponent, TitleComponent],
  templateUrl: './choose-type.component.html',
  styleUrl: './choose-type.component.scss'
})
export class ChooseTypeComponent {

  constructor(private modalService : ModalService,
              private router : Router) {}

  individualMode(){
    this.router.navigate(["/menu"]);
  }

  groupMode(){
    this.modalService.open(GroupCodeModalComponent, {}, true);
  }
}
