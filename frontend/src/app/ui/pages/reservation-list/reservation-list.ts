import {Component, OnInit} from '@angular/core';
import {Reservation, ReservationItem} from '../../molecules/reservation-item/reservation-item';
import {TitleComponent} from '../../atoms/title/title.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {Router} from '@angular/router';
import {GroupService} from '../../../services/group.service';

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
              private groupService: GroupService) {
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

  onPayReservation(reservation: Reservation) {
    this.groupService.payForReservation(reservation.code).subscribe({
      next: () => {
        reservation.paiementInfo.payed = true;
        console.log('💰 Paiement de la réservation effectué !');
        alert(`Merci d'avoir payé la réservation !`);
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

