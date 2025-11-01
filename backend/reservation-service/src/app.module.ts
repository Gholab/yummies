import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Reservation, ReservationSchema} from "./schemas/reservation.schema";
import {ReservationController} from "./controllers/reservation.controller";
import {ReservationService} from "./services/ReservationService";

@Module({
  imports: [
      MongooseModule.forRoot("mongodb://mongo_db_reservation:27017/yummies"),
      MongooseModule.forFeature([{name: Reservation.name, schema : ReservationSchema}])
  ],
  controllers: [AppController, ReservationController],
  providers: [AppService, ReservationService],
})
export class AppModule {}
