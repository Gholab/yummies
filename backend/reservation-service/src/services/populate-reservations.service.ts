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
          starters: ['salade quinoa', 'soupe thai', 'crab maki'],
          mains: ['tagliatelles mer', 'gratin dauphinois', 'risotto'],
          desserts: ['brownie', 'rasp and peaches', 'chocolate'],
        },
        tableNumbers: [5, 6],
        menuPrice: 25,
        customerEstimation: 10
      });

      await this.createReservation({
        companyName: "Schneider Electric",
        code: 102,
        menu: {
          starters: ['soft-boiled egg', 'goat cheese', 'burrata'],
          mains: ['tagliatelles mer','poulet curry', 'risotto'],
          desserts: ['lemon', 'strawberries', 'chocolate'],
        },
        tableNumbers: [7, 8, 9],
        menuPrice: 26,
        customerEstimation: 15
      });

      await this.createReservation({
        companyName: "SAP",
        code: 103,
        menu: {
          starters: ['soft-boiled egg', 'goat cheese', 'salmon'],
          mains: ['tarte poireaux', 'tagliatelles mer', 'poulet curry'],
          desserts: ['lemon', 'strawberries', 'brownie'],
        },
        tableNumbers: [8, 9],
        menuPrice: 20,
        customerEstimation: 12
      });

      await this.createReservation({
        companyName: "Thales",
        code: 104,
        menu: {
          starters: ['salade quinoa', 'soupe thai', 'goat cheese'],
          mains: ['tarte poireaux', 'tagliatelles mer', 'gratin dauphinois'],
          desserts: ['lemon', 'chocolate', 'rasp and peaches'],
        },
        tableNumbers: [11, 12],
        menuPrice: 17,
        customerEstimation: 15
      });

      await this.createReservation({
        companyName: "Avisto",
        code: 105,
        menu: {
          starters: ['salmon', 'soupe thai', 'soft-boiled egg'],
          mains: ['gratin dauphinois', 'poulet curry', 'risotto'],
          desserts: ['brownie', 'chocolate', 'strawberries'],
        },
        tableNumbers: [1, 2],
        menuPrice: 28,
        customerEstimation: 20
      });

      console.log('[Reservation Service] Initial reservations populated successfully!');
    } catch (error) {
      console.error('[Reservation Service] Error populating reservations:', error.message);
    }
  }
}
