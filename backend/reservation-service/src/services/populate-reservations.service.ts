import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Reservation } from '../schemas/reservation.schema';

@Injectable()
export class StartupReservationService implements OnApplicationBootstrap {
  constructor(@InjectConnection() private readonly connection: Connection) { }

  private async createReservation(reservation: Partial<Reservation>) {
    const reservationModel = this.connection.models['Reservation'];

    const exists = await reservationModel.findOne({ code: reservation.code }).exec();
    if (exists) {
      console.log(`[Reservation Service] Reservation with code ${reservation.code} already exists.`);
      return;
    }

    await reservationModel.create(reservation);
    console.log(`[Reservation Service] Reservation with code ${reservation.code} created.`);
  }

  async onApplicationBootstrap() {
    console.log('[Reservation Service] Populating initial reservations...');

    try {
      await this.createReservation({
        companyName: "Amadeus",
        code: 101,
        menu: {
          starters: ['salade quinoa', 'soupe thai'],
          mains: ['tagliatelles mer', 'gratin dauphinois'],
          desserts: ['brownie', 'rasp and peaches'],
        },
        tableNumbers: [5, 6],
        menuPrice: 25,
      });

      await this.createReservation({
        companyName: "Schneider Electric",
        code: 102,
        menu: {
          starters: ['salade quinoa', 'soupe thai'],
          mains: ['tagliatelles mer','poulet curry'],
          desserts: ['lemon', 'strawberries'],
        },
        tableNumbers: [7, 8, 9],
        menuPrice: 26,
      });

      await this.createReservation({
        companyName: "SAP",
        code: 103,
        menu: {
          starters: ['salade quinoa', 'soupe thai'],
          mains: ['tarte poireaux', 'tagliatelles mer'],
          desserts: ['lemon', 'strawberries'],
        },
        tableNumbers: [8, 9],
        menuPrice: 20,
      });

      await this.createReservation({
        companyName: "Thales",
        code: 104,
        menu: {
          starters: ['salade quinoa', 'soupe thai'],
          mains: ['tarte poireaux', 'tagliatelles mer'],
          desserts: ['lemon', 'chocolate'],
        },
        tableNumbers: [11, 12],
        menuPrice: 17,
      });

      await this.createReservation({
        companyName: "Avisto",
        code: 105,
        menu: {
          starters: ['salade quinoa', 'soupe thai'],
          mains: ['gratin dauphinois', 'poulet curry'],
          desserts: ['brownie', 'chocolate'],
        },
        tableNumbers: [1, 2],
        menuPrice: 28,
      });

      console.log('[Reservation Service] Initial reservations populated successfully!');
    } catch (error) {
      console.error('[Reservation Service] Error populating reservations:', error.message);
    }
  }
}
