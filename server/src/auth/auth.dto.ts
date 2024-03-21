import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  IsString,
  IsIn,
  IsOptional,
  IsArray,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Password',
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  password: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Role',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsIn(['user', 'qa', 'research_analyst'])
  role: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'following',
  })
  @IsArray()
  @IsOptional()
  following: string[];
}

export class LoginDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Password',
  })
  @IsNotEmpty()
  // @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  password: string;
}
