import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Reservation, ReservationSchema } from "./schemas/reservation.schema";
import { ReservationController } from "./controllers/reservation.controller";
import { ReservationService } from "./services/reservation.service";
import { ReservationModule } from './modules/reservation.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://mongo_db_reservation:27017/yummies"),
    ReservationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
