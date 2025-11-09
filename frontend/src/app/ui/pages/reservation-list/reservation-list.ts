import {Component, OnInit} from '@angular/core';
import {Reservation, ReservationItem} from '../../molecules/reservation-item/reservation-item';
import {TitleComponent} from '../../atoms/title/title.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {Router} from '@angular/router';
import {GroupService} from '../../../services/group.service';
import {ModalService} from '../../../services/modal.service';
import {ReservationPaymentModal} from '../../molecules/reservation-payment-modal/reservation-payment-modal';

@Component({
  selector: 'app-reservation-list',
  imports: [
    ReservationItem,
    TitleComponent,
    ButtonComponent
  ],
  templateUrl: './reservation-list.html',
  standalone: true,
  styleUrl: './reservation-list.scss'
})
export class ReservationList implements OnInit{
  constructor(private router:Router,
              private groupService: GroupService,
              private modalService: ModalService) {
  }

  reservations: Reservation[] = []

  ngOnInit() {
    this.groupService.computeAndGetReservations().subscribe({
      next: (reservations: Reservation[]) => {
        this.reservations = reservations
      },
      error: (err) => {
        console.log("ERROR: couldn't fetch computed reservations : ")
      }
    })
  }

  async onPayReservation(reservation: Reservation) {
    const result = await this.modalService.open(ReservationPaymentModal, {price: reservation.paiementInfo.totalPrice}).closed;
    this.groupService.payForReservation(reservation.code).subscribe({
      next: () => {
        reservation.paiementInfo.payed = true;
        console.log('💰 Paiement de la réservation effectué !');
      },
      error: (err: any) => {
        console.log("ERROR: couldn't pay for reservation ", err);
      }
    })

  }

  addReservation(){
    this.router.navigate(['/reservation/new']);
  }

}

