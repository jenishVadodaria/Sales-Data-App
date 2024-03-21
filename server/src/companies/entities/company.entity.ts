/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  // @Prop({ type: mongoose.Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  profile: string;

  @Prop()
  website: string;

  @Prop()
  headquarter: string;

  @Prop()
  email: string;

  @Prop([{}])
  keyMembers: Record<string, any>[];

  @Prop([{}])
  swot: Record<string, any>;

  @Prop()
  recentBoardAnnouncement: string[];

  @Prop([{}])
  problems: Record<string, any>[];

  @Prop([{}])
  painPoints: Record<string, any>[];

  @Prop([{}])
  challenges: Record<string, any>[];

  @Prop([{}])
  latestLaunches: Record<string, any>[];

  @Prop([{}])
  strategicFocusAreas: Record<string, any>[];

  @Prop([{}])
  risks: Record<string, any>[];

  @Prop()
  revenuePercentage: number;

  @Prop()
  talentManagement: string;

  @Prop()
  infrastructure: string;

  @Prop()
  productDevelopment: string;

  @Prop()
  customerExperience: string;

  @Prop([{}])
  expansionPlans: Record<string, any>[];

  @Prop()
  loanLossProvision: string;

  @Prop({ ref: 'Company' })
  peerCompanies: mongoose.Types.ObjectId[];

  @Prop([{}])
  financials: Record<string, any>[];

  @Prop([{}])
  itExpenses: Record<string, any>[];

  @Prop()
  isNew: boolean;

  @Prop()
  isPublished: boolean;

  @Prop()
  isEdited: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
