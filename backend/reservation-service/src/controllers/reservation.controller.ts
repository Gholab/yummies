import {Reservation} from "../schemas/reservation.schema";
import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Res} from "@nestjs/common";
import {ReservationService} from "../services/ReservationService";
import {NoReservationFoundErrorDto} from "../exceptions/no-reservation-found-error.dto";


@Controller('reservations') // /reservations
export class ReservationController{
    constructor(private reservationService: ReservationService) {
    }


    @Get("/:code")
    async getReservationByCode(@Res() response, @Param('code') code: number){
        try{
            let reservation = await this.reservationService.findByCode(code);
            return response.status(HttpStatus.OK).json({reservation});
        }catch (e: any){
            return response.status(HttpStatus.NOT_FOUND).json({e});
        }
    }

    @Post("")
    async createReservation(@Res() response, @Body() res: Reservation){
        let newRes = await this.reservationService.create(res);
        return response.status(HttpStatus.CREATED).json(newRes);
    }

    @Delete("/:id")
    async deleteReservation(@Res() response, @Param('id') id: string){
        try{
            await this.reservationService.deleteReservation(id);
            return response.status(HttpStatus.OK).json({});
        }catch(e: any){
            return response.status(HttpStatus.NOT_FOUND).json({e});
        }
    }

}