import { Component } from '@angular/core';
import {Reservation, ReservationItem} from '../../molecules/reservation-item/reservation-item';
import {TitleComponent} from '../../atoms/title/title.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {Router} from '@angular/router';

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
export class ReservationList {
  constructor(private router:Router) {
  }

  reservations = [
    {
      companyName: 'OpenAI France',
      reservationCode: 'RES-2025',
      expectedGuests: 25,
      actualGuests: 23,
      menuPrice: 35,
    },
    {
      companyName: 'TechCorp',
      reservationCode: 'TC-01',
      expectedGuests: 40,
      actualGuests: 38,
      menuPrice: 32,
    },
  ];

  onPayReservation(reservation: Reservation) {
    console.log('💰 Paiement de la réservation :', reservation);
    alert(`Paiement lancé pour ${reservation.companyName}`);
  }

  addReservation(){
    this.router.navigate(['/reservation/new']);
  }

}

