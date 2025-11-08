import {Injectable} from "@nestjs/common";
import {Reservation, ReservationDocument} from "../schemas/reservation.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {NoReservationFoundErrorDto} from "../exceptions/no-reservation-found-error.dto";


@Injectable()
export class ReservationService {
    private TOLERANCE_PERCENTAGE: number = 15;

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
    async findByCompanyName(companyName: string): Promise<Reservation[]> {
        let res = await this.reservationModel.find({companyName: companyName}).exec();
        if(res === null || res.length === 0){
            throw new NoReservationFoundErrorDto(-1);
        }
        return res;
    }

    async deleteReservation(id: string) {
        let res = await this.reservationModel.deleteOne({_id: id}).exec();
        if( res === null){
            throw new NoReservationFoundErrorDto(-1);
        }
    }
    
    async calculatePriceForReservation(code: number){
        let res = await this.reservationModel.findOne({code: code}).exec();
        if (res === null){
            throw new NoReservationFoundErrorDto(-1);
        }
        
        // TODO: recupere le nombre de commande reel depuis le service dinning-service
        res.paiementInfo = {
            payed: false,
            orderCount: 0,
            pricePerOrder: 0,
            totalPrice: 0,
        };
        // TODO: recupere le real price depuis le menu-service
        res.realPrice = 0;

        const diffPercent = ((res.customerEstimation - res.paiementInfo.orderCount)) * 100
        let totalPrice = 0;
        if ( Math.abs(diffPercent) <= this.TOLERANCE_PERCENTAGE ){
            totalPrice = res.menuPrice * res.paiementInfo.orderCount;
        } else if ( diffPercent < -this.TOLERANCE_PERCENTAGE ){
            totalPrice = res.realPrice * res.paiementInfo.orderCount;
        } else {
            const extraPeople = res.paiementInfo.orderCount - res.customerEstimation;
            totalPrice = (res.menuPrice * res.customerEstimation) + (res.realPrice * extraPeople);
        }
        res.paiementInfo.totalPrice = totalPrice;
        await res.save();
        return totalPrice;
    }
}