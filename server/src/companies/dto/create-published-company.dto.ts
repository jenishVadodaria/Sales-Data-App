import {
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreatePublishedCompanyDto {
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  profile: string;

  @IsString()
  website: string;

  @IsString()
  headquarter: string;

  @IsString()
  email: string;

  @IsArray()
  @IsOptional()
  keyMembers: Record<string, any>[];

  // @IsArray()
  @IsOptional()
  swot: Record<string, any>;

  @IsArray()
  recentBoardAnnouncement: string[];

  @IsArray()
  @IsOptional()
  problems: Record<string, any>[];

  @IsArray()
  @IsOptional()
  painPoints: Record<string, any>[];

  @IsArray()
  @IsOptional()
  challenges: Record<string, any>[];

  @IsArray()
  @IsOptional()
  latestLaunches: Record<string, any>[];

  @IsArray()
  @IsOptional()
  strategicFocusAreas: Record<string, any>[];

  @IsArray()
  @IsOptional()
  risks: Record<string, any>[];

  @IsNumber()
  revenuePercentage: number;

  @IsString()
  talentManagement: string;

  @IsString()
  infrastructure: string;

  @IsString()
  productDevelopment: string;

  @IsString()
  customerExperience: string;

  @IsArray()
  @IsOptional()
  expansionPlans: Record<string, any>[];

  @IsString()
  loanLossProvision: string;

  @IsArray()
  peerCompanies: any[];

  @IsArray()
  financials: Record<string, any>[];

  @IsArray()
  itExpenses: Record<string, any>[];

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
