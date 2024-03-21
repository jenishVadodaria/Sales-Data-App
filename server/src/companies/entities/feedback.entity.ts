/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Feedback extends Document {
  //   _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, ref: 'PublishedCompany' })
  companyId: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
