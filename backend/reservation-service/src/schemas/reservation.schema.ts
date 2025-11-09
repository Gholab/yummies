import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose"
import { PaiementInfo, PaiementInfoSchema } from "./paiement-info.schema";


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

    @Prop({ type: PaiementInfoSchema, required: false })
    paiementInfo?: PaiementInfo;
}


export const ReservationSchema = SchemaFactory.createForClass(Reservation);