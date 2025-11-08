import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose"


export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop()
    companyName: String;

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

    @Prop({required:false})
    realPrice?: number;

    @Prop()
    customerEstimation: number;

    @Prop({required:false})
    paiementInfo?: {
        payed: boolean;
        orderCount: number;
        totalPrice: number;
    }
}


export const ReservationSchema = SchemaFactory.createForClass(Reservation);