import {Component, Inject, Input} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {PaymentType} from '../../../models/payment-type.enum';
import {PaymentService} from '../../../services/payment.service';
import {Router} from '@angular/router';
import {GroupService} from '../../../services/group.service';
import {Reservation} from '../reservation-item/reservation-item';
import {ButtonComponent} from '../../atoms/button/button.component';
import {PriceDisplayComponent} from '../../atoms/price-display/price-display.component';

@Component({
  selector: 'app-reservation-payment-modal',
  imports: [ButtonComponent, PriceDisplayComponent],
  templateUrl: './reservation-payment-modal.html',
  styleUrl: './reservation-payment-modal.scss'
})
export class ReservationPaymentModal {
  @Input() price : number = 0;

  constructor(private modalService: ModalService,
              private paymentService: PaymentService,
              private groupService: GroupService) {}

  async ngAfterViewInit(){
    await this.paymentService.waitForPayment();
    this.closeModal(true);
  }

  closeModal(val: any){
    this.modalService.close(val);
  }
}
