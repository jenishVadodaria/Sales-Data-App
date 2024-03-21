/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  // @Prop({ required: true })
  email: string;

  @Prop({})
  name: string;

  @Prop({ select: false })
  password: string;

  // make it non select by default
  @Prop({ select: false })
  salt: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ ref: 'PublishedCompany' }) // ref to company
  following: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
