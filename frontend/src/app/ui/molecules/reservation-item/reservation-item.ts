import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';
import {TitleComponent} from '../../atoms/title/title.component';

export interface Reservation {
  companyName: string;
  reservationCode: string;
  expectedGuests: number;
  actualGuests: number;
  menuPrice: number;
}

@Component({
  selector: 'app-reservation-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TitleComponent],
  templateUrl: './reservation-item.html',
  styleUrls: ['./reservation-item.scss'],
})
export class ReservationItem{
  @Input() reservation!: Reservation;
  @Output() payReservation = new EventEmitter<Reservation>();

  get totalPrice(): number {
    return this.reservation.actualGuests * this.reservation.menuPrice;
  }
  onPayClick() {
    this.payReservation.emit(this.reservation);
  }
}
