import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShippingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  packageType: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}