import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from '../controllers/reservation.controller';
import { ReservationService } from '../services/reservation.service';
import { StartupReservationService } from '../services/populate-reservations.service';
import { Reservation, ReservationSchema } from '../schemas/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService, StartupReservationService],
  exports: [ReservationService],
})
export class ReservationModule { }
