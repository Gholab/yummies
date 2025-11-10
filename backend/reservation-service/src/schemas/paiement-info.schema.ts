import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class PaiementInfo {
  @Prop({ required: false, default: false })
  payed: boolean;

  @Prop({ required: false, default: 0 })
  orderCount: number;

  @Prop({ required: false, default: 0 })
  totalPrice: number;
}

export type PaiementInfoDocument = PaiementInfo & Document;
export const PaiementInfoSchema = SchemaFactory.createForClass(PaiementInfo);
