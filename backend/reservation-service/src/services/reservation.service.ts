import {Injectable} from "@nestjs/common";
import {Reservation, ReservationDocument} from "../schemas/reservation.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import { HttpService } from "@nestjs/axios";
import {NoReservationFoundErrorDto} from "../exceptions/no-reservation-found-error.dto";
import { firstValueFrom } from "rxjs";


@Injectable()
export class ReservationService {
    private TOLERANCE_PERCENTAGE: number = 15;

    constructor(@InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>, private readonly httpService: HttpService,){
        
    }

    async create(reservation: Reservation) : Promise<Reservation> {
        const newRes = new this.reservationModel(reservation);
        return newRes.save();
    }

    async findAll() {
        return this.reservationModel.find().lean();
    }

    async findByCode(code: number) {
        let res = await this.reservationModel.findOne({code: code}).lean();
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
    async getOrderCountForReservation(reservation: Reservation) {
        const diningServiceUrl = `http://dining-service:3000/tableOrders/reservation/${reservation.code}/orderCount`;
        let orderCount: number;
        try {
            const response = await firstValueFrom(this.httpService.get(diningServiceUrl));
            orderCount = response.data.totalOrders;
        } catch (error) {
            console.error(`[RESERVATION SERVICE] Impossible de récupérer les commandes depuis dining-service :`, error.message);
            orderCount = 0;
        }
        return orderCount;
    }
    async getRealPriceForMenuItem(menuItemShortname: string) {
        const menuServiceUrl = `http://menu-service:3000/menu/${menuItemShortname}`;
        let price: number;
        try {
            const response = await firstValueFrom(this.httpService.get(menuServiceUrl));
            price = response.data.price;
        } catch (error) {
            console.error(`[RESERVATION SERVICE] Impossible de récupérer le prix depuis menu-service pour l'item ${menuItemShortname} :`, error.message);
            price = 0;
        }
        return price;
    }
    async getRealPriceForReservation(reservation: Reservation) {
        let starterAvgPrice = 0;
        let mainAvgPrice = 0;
        let dessertAvgPrice = 0;
        reservation.menu.starters.forEach(async (starter) => {
            const realPrice = await this.getRealPriceForMenuItem(starter);
            starterAvgPrice += realPrice;
        });
        starterAvgPrice = starterAvgPrice / reservation.menu.starters.length;
        reservation.menu.mains.forEach(async (main) => {
            const realPrice = await this.getRealPriceForMenuItem(main);
            mainAvgPrice += realPrice;
        });
        mainAvgPrice = mainAvgPrice / reservation.menu.mains.length;
        reservation.menu.desserts.forEach(async (dessert) => {
            const realPrice = await this.getRealPriceForMenuItem(dessert);
            dessertAvgPrice += realPrice;
        });
        dessertAvgPrice = dessertAvgPrice / reservation.menu.desserts.length;
        reservation.realPrice = starterAvgPrice + mainAvgPrice + dessertAvgPrice;
        return reservation.realPrice;
    }

    async calculatePriceForReservation(code: number){
        let res = await this.reservationModel.findOne({code: code}).exec();
        if (res === null){
            throw new NoReservationFoundErrorDto(code);
        }
        if(res.paiementInfo){ //don't modify if reservation is payed
            if(res.paiementInfo.payed){
                return res.paiementInfo.totalPrice;
            }
        }
        // initialize paiementInfo 
        res.paiementInfo = {
            payed: false,
            orderCount: 0,
            totalPrice: 0,
        };
        // get order count from dining-service
        res.paiementInfo.orderCount = await this.getOrderCountForReservation(res);
        // get real price for reservation
        res.realPrice = await this.getRealPriceForReservation(res);

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

    async calculatePricesAndGetReservations(){
        const reservations = await this.reservationModel.find().lean();
        for(let reservation of reservations){
            console.log("Computing Price for Reservation with code : "+ reservation.code);
            await this.calculatePriceForReservation(reservation.code);
        }
        return this.reservationModel.find().lean();
    }

    async markReservationAsPaid(code: number) {
        let res = await this.reservationModel.findOne({code: code}).exec();
        if (res === null){
            throw new NoReservationFoundErrorDto(code);
        }
        if(res.paiementInfo){
            res.paiementInfo.payed = true;
        }else{
            throw new NoReservationFoundErrorDto(code)
        }

        await res.save();
    }
}