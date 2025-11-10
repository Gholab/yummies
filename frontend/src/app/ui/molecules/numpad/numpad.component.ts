import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitButtonComponent } from '../../atoms/digit-button/digit-button.component';
import { OrderService } from '../../../services/order/order.service';
import { ModalService } from '../../../services/modal.service';
import { ORDER_SERVICE } from '../../../services/services.token';
import {ButtonComponent} from '../../atoms/button/button.component';
import {TitleComponent} from '../../atoms/title/title.component';
import {ErrorMessage} from '../error-message/error-message.component';
import {GroupService} from '../../../services/group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-numpad',
  standalone: true,
  imports: [CommonModule, DigitButtonComponent, ButtonComponent],
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.scss']
})
export class NumpadComponent {
  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService,
              private modalService: ModalService,
              private groupService: GroupService,
              private router: Router) {}
  @Input() modeBipper = true;
  @Output() nextStep = new EventEmitter<void>();
  inputValue: string = '';
  keys: (number)[] = [1,2,3,4,5,6,7,8,9,0];

  onKeyClick(key: string | number) {
    if (key === '→') {
      if(this.modeBipper){
        this.setBipperNumber();
      }else{
        this.tryGroupCode();
      }
      return;
    }
    this.inputValue += key.toString();
  }

  setBipperNumber(){
    if( Number(this.inputValue) < 0 || Number(this.inputValue) > 50){
      this.modalService.open(ErrorMessage, {
        text: "Veuillez entrer un numéro de bipper valide !",
      }).closed.then(r => {this.inputValue = '';});
      return
    }
    let numValue = parseInt(this.inputValue, 10);
    this.orderService.addBipperNumber(numValue);
    if(this.orderService.getTotalOrderPrice() === 0){
      this.orderService.completeOrder().subscribe(() => {
        this.router.navigate(['/endPage']);
      });
    }else{
      this.inputValue = ''; // reset après validation
      this.nextStep.emit();
    }

  }

  tryGroupCode(){
    this.groupService.submitCode(parseInt(this.inputValue, 10)).subscribe({
      next: value => {
        this.orderService.setCustomerCount(value.code);
        this.groupService.setGroupName(value.companyName);
        this.groupService.setGroupCode(parseInt(this.inputValue, 10));
        this.groupService.setBookedTables(value.tableNumbers);
        this.modalService.close(true);
        this.router.navigate(['/menu/group']);
      },
      error: err => {
        this.nextStep.emit();
      }
    })
  }

  suppressInput(){
    this.inputValue = '';
  }
}
