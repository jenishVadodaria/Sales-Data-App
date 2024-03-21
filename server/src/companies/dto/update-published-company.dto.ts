import { PartialType } from '@nestjs/swagger';
import { CreatePublishedCompanyDto } from './create-published-company.dto';

export class UpdatePublishedCompanyDto extends PartialType(
  CreatePublishedCompanyDto,
) {}
