import { IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  companyId: string;
}
