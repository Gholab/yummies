import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Reservation, ReservationSchema} from "./schemas/reservation.schema";

@Module({
  imports: [
      MongooseModule.forRoot("mongodb://localhost:27021/yummies"),
      MongooseModule.forFeature([{name: Reservation.name, schema : ReservationSchema}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
