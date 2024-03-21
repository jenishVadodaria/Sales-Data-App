import {
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCompanyDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  profile: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  headquarter: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsArray()
  @IsOptional()
  keyMembers: Record<string, any>[];

  // @IsArray()
  @IsOptional()
  swot: Record<string, any>;

  @IsArray()
  @IsOptional()
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
  @IsOptional()
  revenuePercentage: number;

  @IsString()
  @IsOptional()
  talentManagement: string;

  @IsString()
  @IsOptional()
  infrastructure: string;

  @IsString()
  @IsOptional()
  productDevelopment: string;

  @IsString()
  @IsOptional()
  customerExperience: string;

  @IsArray()
  @IsOptional()
  expansionPlans: Record<string, any>[];

  @IsString()
  @IsOptional()
  loanLossProvision: string;

  @IsArray()
  @IsOptional()
  peerCompanies: any[];

  @IsArray()
  @IsOptional()
  financials: Record<string, any>[];

  @IsArray()
  @IsOptional()
  itExpenses: Record<string, any>[];

  @IsBoolean()
  isNew: boolean;

  @IsBoolean()
  isPublished: boolean;

  @IsBoolean()
  @IsOptional()
  isEdited: boolean;

  // @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
