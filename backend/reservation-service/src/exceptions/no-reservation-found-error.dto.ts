import {ErrorDto} from "./error.dto";
import {HttpStatus} from "@nestjs/common";

export class NoReservationFoundErrorDto extends ErrorDto {
    constructor(code: number) {
        super(HttpStatus.NOT_FOUND, 'No reservation with corresponding code', `"${code}" is not a valid code`);
    }
}