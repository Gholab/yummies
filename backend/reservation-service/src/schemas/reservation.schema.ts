import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose"


export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {

    @Prop()
    code: number;

    @Prop({
        type: {
            starters: [String],
            mains: [String],
            desserts: [String],
        },
    })
    menu: {
        starters: string[];
        mains: string[];
        desserts: string[];
    };
    @Prop()
    tableNumbers : number[];

    @Prop()
    menuPrice: number;
}


export const ReservationSchema = SchemaFactory.createForClass(Reservation);