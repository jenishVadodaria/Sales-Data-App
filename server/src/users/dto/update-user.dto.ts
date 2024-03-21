import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  // @ApiProperty({
  //   required: true,
  //   type: String,
  //   description: 'id',
  // })
  // @IsString()
  // @IsNotEmpty()
  // _id: string;

  @ApiProperty({
    type: String,
    description: 'name',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'email',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'role',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsIn(['user', 'qa', 'research_analyst'])
  role: string;
}
