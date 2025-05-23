import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';
export class DeliveryGuyDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  contact: string;
}

export class ThirdPartyDeliveryDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  contact: string;

  @ApiProperty({ type: [DeliveryGuyDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeliveryGuyDto)
  deliveryGuys: DeliveryGuyDto;
}
