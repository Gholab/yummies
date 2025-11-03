import {Injectable} from "@nestjs/common";
import {AxiosResponse} from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";
import {firstValueFrom} from "rxjs";
import {Reservation} from "../models/reservation.model";
import {MenusService} from "./menus.service";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class ReservationProxyService {
    private _baseUrl: string;

    constructor(private readonly menuService: MenusService, private readonly httpService: HttpService) {
        this._baseUrl = `http://reservation-service:3003`;
    }

    async getReservationByCode(reservationCode: number) {
        try {
            const reservationResponse: AxiosResponse<Reservation> = await firstValueFrom(this.httpService.get(`${this._baseUrl}/reservations/`+reservationCode));
            let reservation = reservationResponse.data;
            console.log("the reservation")
            console.log(reservation)
            for(let mealCategory in reservation.menu) {//mealCategory = "starters", "mains", "desserts", "_id"
                if (mealCategory !== "_id") {
                    reservation.menu[mealCategory]=await Promise.all(reservation.menu[mealCategory]
                        .map(async (mealShortname) => await this.menuService.findByShortname(mealShortname)));
                }
            }

            return reservation;
        }
        catch(e) {
            /* istanbul ignore next */
            console.error('Error happened');
            /* istanbul ignore next */
            console.error(e);
        }
    }
}
