import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'id',
  })
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: 'isDeleted',
  })
  @IsBoolean()
  @IsNotEmpty()
  isDeleted: boolean;
}
