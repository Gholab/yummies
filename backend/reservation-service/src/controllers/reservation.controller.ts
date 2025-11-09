import { Reservation } from "../schemas/reservation.schema";
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { ReservationService } from "../services/reservation.service";


@Controller('reservations') // /reservations
export class ReservationController {
    constructor(private reservationService: ReservationService) {
    }

    @Get()
    async getAllReservations(@Res() response) {
        return response.status(HttpStatus.OK).json(await this.reservationService.findAll());
    }


    @Get("/:code")
    async getReservationByCode(@Res() response, @Param('code') code: number) {
        try {
            let reservation = await this.reservationService.findByCode(code);
            return response.status(HttpStatus.OK).json({...reservation});
        }catch (e: any){
            return response.status(HttpStatus.NOT_FOUND).json({e});
        }
    }

    @Post("")
    async createReservation(@Res() response, @Body() res: Reservation) {
        let newRes = await this.reservationService.create(res);
        return response.status(HttpStatus.CREATED).json(newRes);
    }

    @Get("/:companyName")
    async getReservationsByCompanyName(@Res() response, @Param('companyName') companyName: string) {
        try {
            let reservations = await this.reservationService.findByCompanyName(companyName);
            return response.status(HttpStatus.OK).json({ reservations });
        } catch (e: any) {
            return response.status(HttpStatus.NOT_FOUND).json({ e });
        }
    }

    @Delete("/:id")
    async deleteReservation(@Res() response, @Param('id') id: string) {
        try {
            await this.reservationService.deleteReservation(id);
            return response.status(HttpStatus.OK).json({});
        } catch (e: any) {
            return response.status(HttpStatus.NOT_FOUND).json({ e });
        }
    }
    @Get("/calculate/price/:code")
    async calculatePriceForReservation(@Res() response, @Param('code') code: number) {
        try {
            let totalPrice = await this.reservationService.calculatePriceForReservation(code);
            return response.status(HttpStatus.OK).json({ totalPrice });
        } catch (e: any) {
            return response.status(HttpStatus.NOT_FOUND).json({ e });
        }
    }

}