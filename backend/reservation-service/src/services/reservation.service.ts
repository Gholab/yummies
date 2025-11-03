import {Injectable} from "@nestjs/common";
import {Reservation, ReservationDocument} from "../schemas/reservation.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {NoReservationFoundErrorDto} from "../exceptions/no-reservation-found-error.dto";


@Injectable()
export class ReservationService {

    constructor(@InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>){}


    async create(reservation: Reservation) : Promise<Reservation> {
        const newRes = new this.reservationModel(reservation);
        return newRes.save();
    }

    async findByCode(code: number): Promise<Reservation> {
        let res = await this.reservationModel.findOne({code: code}).exec();
        if(res === null){
            throw new NoReservationFoundErrorDto(code);
        }
        return res;
    }

    async deleteReservation(id: string) {
        let res = await this.reservationModel.deleteOne({_id: id}).exec();
        if( res === null){
            throw new NoReservationFoundErrorDto(-1);
        }
    }
}